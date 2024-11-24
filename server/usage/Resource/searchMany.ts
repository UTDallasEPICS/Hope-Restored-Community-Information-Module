import { PrismaClient } from "@prisma/client";
import { type ResourceDB, RESOURCE_INCLUDE_ALL } from "../../db/constants";
import { Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export type ResourceSearchInput = {
  search?: string;
};

export type SortOption = {
  field: string;
  order: string;
};

export class SearchManyResourceUseCase {
  async execute(
    filters: ResourceSearchInput,
    skip?: number,
    take?: number,
    sortBy: SortOption = { field: "Name", order: "asc" }
  ): Promise<ResourceDB[]> {
    const { field, order } = sortBy;
    let search = filters.search?.trim();
    if (search) search = removeStopWords(search) || search;
    const queryRaw = Prisma.sql`SELECT id
        ${
          field === "relevance"
            ? Prisma.sql`, paradedb.score(id)`
            : Prisma.empty
        }
        FROM resource
        ${
          search
            ? Prisma.sql`WHERE description @@@ ${search} OR name @@@ ${search}`
            : Prisma.empty
        }
        ORDER BY ${
          field === "relevance"
            ? Prisma.sql`paradedb.score(id) ${Prisma.raw(order)}`
            : Prisma.sql`${Prisma.raw(field.toLowerCase())} ${Prisma.raw(
                order
              )}`
        }
        ${take ? Prisma.sql`LIMIT ${take}` : Prisma.empty}
        ${skip ? Prisma.sql`OFFSET ${skip}` : Prisma.empty};`;
    console.log(queryRaw);
    try {
      const results: any = await prisma.$queryRaw(queryRaw);
      const resources = await prisma.resource.findMany({
        skip: skip ?? undefined,
        take: take ?? undefined,
        where: {
          archived: false,
          id: {
            in: results.map((result: any) => result.id),
          },
        },
        include: RESOURCE_INCLUDE_ALL,
      });

      const sortedResources = results.map((result: any) => {
        return resources.find((resource: any) => resource.id === result.id);
      });

      return sortedResources;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

function removeStopWords(searchTerm: string) {
  return searchTerm
    .split(" ")
    .filter((term) => {
      return !stopwords.includes(term);
    })
    .join(" ");
}
const stopwords = `a's 	able 	about 	above 	according
accordingly 	across 	actually 	after 	afterwards
again 	against 	ain't 	all 	allow
allows 	almost 	alone 	along 	already
also 	although 	always 	am 	among
amongst 	an 	and 	another 	any
anybody 	anyhow 	anyone 	anything 	anyway
anyways 	anywhere 	apart 	appear 	appreciate
appropriate 	are 	aren't 	around 	as
aside 	ask 	asking 	associated 	at
available 	away 	awfully 	be 	became
because 	become 	becomes 	becoming 	been
before 	beforehand 	behind 	being 	believe
below 	beside 	besides 	best 	better
between 	beyond 	both 	brief 	but
by 	c'mon 	c's 	came 	can
can't 	cannot 	cant 	cause 	causes
certain 	certainly 	changes 	clearly 	co
com 	come 	comes 	concerning 	consequently
consider 	considering 	contain 	containing 	contains
corresponding 	could 	couldn't 	course 	currently
definitely 	described 	despite 	did 	didn't
different 	do 	does 	doesn't 	doing
don't 	done 	down 	downwards 	during
each 	edu 	eg 	eight 	either
else 	elsewhere 	enough 	entirely 	especially
et 	etc 	even 	ever 	every
everybody 	everyone 	everything 	everywhere 	ex
exactly 	example 	except 	far 	few
fifth 	first 	five 	followed 	following
follows 	for 	former 	formerly 	forth
four 	from 	further 	furthermore 	get
gets 	getting 	given 	gives 	go
goes 	going 	gone 	got 	gotten
greetings 	had 	hadn't 	happens 	hardly
has 	hasn't 	have 	haven't 	having
he 	he's 	hello 	help 	hence
her 	here 	here's 	hereafter 	hereby
herein 	hereupon 	hers 	herself 	hi
him 	himself 	his 	hither 	hopefully
how 	howbeit 	however 	i'd 	i'll
i'm 	i've 	ie 	if 	ignored
immediate 	in 	inasmuch 	inc 	indeed
indicate 	indicated 	indicates 	inner 	insofar
instead 	into 	inward 	is 	isn't
it 	it'd 	it'll 	it's 	its
itself 	just 	keep 	keeps 	kept
know 	known 	knows 	last 	lately
later 	latter 	latterly 	least 	less
lest 	let 	let's 	like 	liked
likely 	little 	look 	looking 	looks
ltd 	mainly 	many 	may 	maybe
me 	mean 	meanwhile 	merely 	might
more 	moreover 	most 	mostly 	much
must 	my 	myself 	name 	namely
nd 	near 	nearly 	necessary 	need
needs 	neither 	never 	nevertheless 	new
next 	nine 	no 	nobody 	non
none 	noone 	nor 	normally 	not
nothing 	novel 	now 	nowhere 	obviously
of 	off 	often 	oh 	ok
okay 	old 	on 	once 	one
ones 	only 	onto 	or 	other
others 	otherwise 	ought 	our 	ours
ourselves 	out 	outside 	over 	overall
own 	particular 	particularly 	per 	perhaps
placed 	please 	plus 	possible 	presumably
probably 	provides 	que 	quite 	qv
rather 	rd 	re 	really 	reasonably
regarding 	regardless 	regards 	relatively 	respectively
right 	said 	same 	saw 	say
saying 	says 	second 	secondly 	see
seeing 	seem 	seemed 	seeming 	seems
seen 	self 	selves 	sensible 	sent
serious 	seriously 	seven 	several 	shall
she 	should 	shouldn't 	since 	six
so 	some 	somebody 	somehow 	someone
something 	sometime 	sometimes 	somewhat 	somewhere
soon 	sorry 	specified 	specify 	specifying
still 	sub 	such 	sup 	sure
t's 	take 	taken 	tell 	tends
th 	than 	thank 	thanks 	thanx
that 	that's 	thats 	the 	their
theirs 	them 	themselves 	then 	thence
there 	there's 	thereafter 	thereby 	therefore
therein 	theres 	thereupon 	these 	they
they'd 	they'll 	they're 	they've 	think
third 	this 	thorough 	thoroughly 	those
though 	three 	through 	throughout 	thru
thus 	to 	together 	too 	took
toward 	towards 	tried 	tries 	truly
try 	trying 	twice 	two 	un
under 	unfortunately 	unless 	unlikely 	until
unto 	up 	upon 	us 	use
used 	useful 	uses 	using 	usually
value 	various 	very 	via 	viz
vs 	want 	wants 	was 	wasn't
way 	we 	we'd 	we'll 	we're
we've 	welcome 	well 	went 	were
weren't 	what 	what's 	whatever 	when
whence 	whenever 	where 	where's 	whereafter
whereas 	whereby 	wherein 	whereupon 	wherever
whether 	which 	while 	whither 	who
who's 	whoever 	whole 	whom 	whose
why 	will 	willing 	wish 	with
within 	without 	won't 	wonder 	would
wouldn't 	yes 	yet 	you 	you'd
you'll 	you're 	you've 	your 	yours
yourself 	yourselves 	zero`.split(/\s+/);
