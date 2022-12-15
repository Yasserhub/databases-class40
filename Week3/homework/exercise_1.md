What columns violate 1NF?

The columns of food_code and food_description have multiple values.

In addition, this table has no primary key.
Moreover, there are duplicate records for the data of members, dinner and venue.

If you look at the date formation of dinner_date column, you notice that there is no consistency.

What entities do you recognize that could be extracted?
Memeber table should be ctrated containg the following columns: member_id | member_name | member_address.
Dinner table should be ctrated containg the following columns:dinner_id | dinner_date
Venue table should be ctrated containg the following columns:venue_code | venue_description
Food table should be ctrated containg the following columns:food_code | food_description
Venue_Food table should be also created containg the following columns: venue_code | food_code (both could prmary key)

So, member_dinner table should contain the following columns: member_id | dinner_id | venue_code
