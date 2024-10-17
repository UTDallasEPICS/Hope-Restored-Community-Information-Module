# This is for the post request API
After deconstruction the name, group and description from the event. it checks if there are there and returns an error. Everything else is optional
# For the prisma.resource.create
for group(prisma docs) in short if there is already a group created prior it simply connects this resource to the created groups, if there is not group it creates a new one.
# For phone Number
Personal is only connected to phone Number not resource, so it creates the phone Numbers and personal if there is any passed through, other it defaults to "N/A" and "no description"



# This is for the put API's

## Update Resource Demographics API

This API allows you to update or create demographics for a specific resource. It either updates the name of an existing demographic or creates a new one if it doesn't exist.

## it checks if the resource itself exists on the database
## using the resourceId
const resource = await prisma.resource.findUnique({
      where: { id: resourceId },
      select: {
        Demo: true,
      },
    });

## const updatedDemographics = await Promise.all

Since demographics is an array, this Api maps through the
Demographics in the database if its there it updates it in its index, if not it creates a new demographic in an index. and connects to the resource(very important)
**In the postman you want to pass the json as an array**
**Objects(This is only for testing backend)**





# Update language API
This API allows you to update or create language for a specific resource. It either updates the existing language or creates a new one if it doesn't exist. and connects to the resource(very important)

extremely similar to the demograpics API




# Update location API
This API allows you to update or create locations for a specific resource. It either updates the existing locations or creates a new one if it doesn't exist. and connects to the resource(very important)

Again similar to the Demographic and language API



# Update Personal API
Since personal is not attached to the resource directly but to phone numbers, you update the personal directly, It checks if the personalId is there, then updates the name and description




# Update phonenumbers API

This API can edit the Phone Numbers tied to a resource if no personalId was passed, but if it is passed it instead edits the phonenumbers inside personal.
Same as demo and location API's, it maps through the phone Numbers and updates it either in the resource or personal, if personal Id is passed or not




