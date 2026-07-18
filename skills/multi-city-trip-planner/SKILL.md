---
name: multi-city-trip-planner
description: Use this skill whenever the user wants to plan a multi-destination or multi-week trip involving flight search across several legs (international + domestic), hotel selection per destination, and a day-by-day itinerary. Make sure to trigger this any time the user mentions planning a trip with multiple cities/countries, asks to compare or pick flights between destinations, wants hotel suggestions for a trip, or asks for an itinerary with activities and rest days — even if they only mention one leg of the trip at first, since trips are often built incrementally leg-by-leg across a conversation. Also trigger when the user asks to adjust an existing multi-city trip (add/remove a destination, change leg order, change dates, change number of nights somewhere), or when they ask to turn a planned trip into a Notion page or a KML map file.
---

# Multi-City Trip Planner

A skill for building multi-destination trips interactively, leg by leg, the way people actually plan: pick a rough structure, search flights for each leg, adjust based on preferences (price, duration, legroom, fewest stops), search hotels per destination, build a day-by-day itinerary with rest days, total the budget, and optionally save everything to Notion and/or export a KML map.

Trips built with this skill are rarely specified all at once. The user will typically build it incrementally across many turns — adding a destination, changing leg order, swapping out a city, adjusting nights in one place. Treat every follow-up message as a potential modification to the existing plan rather than a new trip, unless the user clearly starts over.

## Step 1: Establish the skeleton

Before searching anything, get a rough skeleton of the trip:
- Departure city/airport and home airport
- Destination(s) and rough order
- Total trip length (or let the user build it leg by leg and total it up as you go)
- Anchor date — if the user references a date relative to another event (e.g. "10 days after X leaves Y"), check their calendar (`event_search_v0`) or past conversations (`conversation_search`) to resolve the anchor before calculating.

If trip length, order, or duration per city is ambiguous, ask using `ask_user_input_v0` with 2-4 short options rather than open-ended questions — this is much easier on mobile. Don't ask more than what's needed to proceed; assume reasonable defaults (e.g. roughly even time split across destinations) and let the user correct you.

## Step 2: Search flights leg by leg

For each leg (international long-haul and domestic/regional), search using whichever flight connector is already connected (check the suggest_connectors / search_mcp_registry flow if none is connected yet — never assume a provider, let the user pick per the MCP App rules).

Defaults unless told otherwise:
- **Cabin**: Economy
- **Legroom**: Recommend adding an Extra Legroom / Economy Extra seat selection at booking for any long-haul leg (>6h), and call this out explicitly in the summary table — it's usually a paid add-on chosen during checkout, not a separate fare class in search results.
- **Stops**: Show both direct and 1-stop options when available; direct is usually worth a moderate price premium given comfort, especially after a long-haul leg.

Present results as a compact markdown table: # | Airline | Departure | Arrival | Duration | Stops | Price | Book link. Never truncate the table.

When the user asks for "shortest," "fastest," or "shorter flight home," re-rank explicitly by duration and call out the trade-off vs. the cheapest option (price delta and time saved) so they can decide — don't just pick one silently.

When the user asks about a stopover or layover city (e.g. "what stops are there"), identify the actual technical/transit stop from the flight search results (don't assume — check what city the layover is actually in) and offer UV index or other relevant context only if it's been a theme in the conversation.

Recalculate and restate total flight time across all legs whenever a leg changes — users planning long trips care about cumulative time in the air, not just per-leg duration.

## Step 3: Search hotels per destination

Default to **2-3 star hotels** ("normal hotels," not hostels or luxury) unless told otherwise. Use whichever accommodation connector is connected (e.g. Booking.com). Required parameters typically include `user_country_code` and `user_locale` — infer these from the user's location/language if the tool errors without them.

Pick one clear recommendation per city (not just a raw list) with a short reason (location, value, amenities), but mention one alternate if there's a meaningfully different option (e.g. beachfront vs. CBD).

## Step 4: Build the day-by-day itinerary

Once cities and nights are confirmed, propose a day-by-day plan per destination:
- Mix iconic/must-see activities with local neighborhood time
- **Always include one rest day per destination** if the user asks for rest days, or proactively suggest one for any stay of 5+ nights — long multi-city trips need recovery days, especially after long-haul legs or jet lag transitions.
- Group day-trips (e.g. wine regions, national parks, scenic drives) as full-day items and flag which need advance booking (popular tours, timed-entry attractions)
- Use a markdown table (Date | Plan) per city for scannability

## Step 5: Budget rollup

Total up: flights (+ legroom add-on estimate), hotels (converted to a consistent currency if mixing), and a per-day estimate for food/activities/local transport (~50-80 €/day is a reasonable default range to suggest, adjustable). Present as a clean summary table with a final estimated range, and note explicitly that it's a planning estimate, not a quote.

## Step 6: Notion + KML (ask first, every time)

After the itinerary is in good shape, ask whether to save the trip to Notion and/or generate a KML map file — **do not do either automatically**, even if the user has asked for this in a previous trip-planning session. Ask each time.

If yes to Notion:
- Search for the user's existing travel/future-trips structure in Notion before creating anything new (`Notion:notion-search`)
- If the user is iterating on a trip with multiple variants (e.g. comparing two routings), suggest creating a parent page for the trip with each variant as a subpage, rather than overwriting — ask if this matches what they want first
- Structure each trip page with: overview table, flights table, hotels table, day-by-day itinerary per city, practical info (currency, weather, UV, time zones, visas, transport cards), and budget summary

If yes to KML:
- One Folder per destination plus a folder for the home airport
- One Placemark per hotel (distinct icon/style) and per notable activity/landmark (distinct icon/style)
- Include relevant dates and booking details in each Placemark's description (CDATA HTML is fine)
- Save government/airport placemarks with arrival/departure flight info noted in the description
- Match the file name and structure to any previous KML files in the conversation/Drive if this is an update to an existing trip, so the user's existing map folder stays consistent

## General conversational patterns to expect

- Users will often answer a sub-question without re-stating the whole plan ("4 days" in response to "how many nights in Wellington") — track context carefully and confirm your interpretation briefly if a one-word/short answer is ambiguous (e.g. "4" could mean 4 nights added, or 4 total).
- Expect requests like "show this as a table," "what's the total flight time," "give me the cheapest vs fastest" — these are requests to reformat or re-derive from data already gathered, not new searches, unless the underlying dates/legs changed.
- When a change is requested to one leg or one city, only re-search and re-confirm what changed — don't restate the entire itinerary in full detail every time; a short delta summary plus an offer to show the full plan again is usually better, unless the user asks for the whole thing.
