CREATE TABLE public.categories (
    category_id integer NOT NULL,
    name character varying(50) NOT NULL
);

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.category_id;

CREATE TABLE public.companies (
    company_id integer NOT NULL,
    name character varying NOT NULL,
    year_founded integer NOT NULL
);

CREATE SEQUENCE public.companies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.companies_id_seq OWNED BY public.companies.company_id;

CREATE TABLE public.country (
    id integer NOT NULL,
    iso character(2) NOT NULL,
    name character varying(80) NOT NULL,
    nicename character varying(80) NOT NULL,
    iso3 character(3) DEFAULT NULL::bpchar
);

CREATE TABLE public.customers (
    customer_id integer NOT NULL,
    first_name character varying(30) NOT NULL,
    last_name character varying(30) NOT NULL,
    username character varying(30) NOT NULL,
    supersecretword character varying(200) NOT NULL,
    salt character varying(14) NOT NULL,
    email character varying(50) NOT NULL
);

CREATE SEQUENCE public.customers_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.customers_id_seq OWNED BY public.customers.customer_id;

CREATE TABLE public.orders (
    order_id uuid NOT NULL,
    customer_id integer NOT NULL,
    date_ordered timestamp with time zone NOT NULL,
    date_delivered timestamp with time zone
);

CREATE SEQUENCE public.orders_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.orders_id_seq OWNED BY public.orders.order_id;

CREATE TABLE public.orders_products (
    order_id uuid NOT NULL,
    product_id integer NOT NULL,
    quantity integer
);

CREATE TABLE public.products (
    product_id integer NOT NULL,
    name character varying(100) NOT NULL,
    stock_amount integer NOT NULL,
    company_id integer NOT NULL,
    description character varying(500) NOT NULL,
    price numeric NOT NULL,
    category integer NOT NULL,
    score integer NOT NULL,
    ratings integer NOT NULL,
    creator text NOT NULL,
    year integer NOT NULL,
    image text NOT NULL
);

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.product_id;

CREATE TABLE public.session (
    sid character varying NOT NULL,
    sess json NOT NULL,
    expire timestamp(6) without time zone NOT NULL
);

ALTER TABLE ONLY public.categories ALTER COLUMN category_id SET DEFAULT nextval('public.categories_id_seq'::regclass);

ALTER TABLE ONLY public.companies ALTER COLUMN company_id SET DEFAULT nextval('public.companies_id_seq'::regclass);

ALTER TABLE ONLY public.customers ALTER COLUMN customer_id SET DEFAULT nextval('public.customers_id_seq'::regclass);

ALTER TABLE ONLY public.products ALTER COLUMN product_id SET DEFAULT nextval('public.products_id_seq'::regclass);

COPY public.categories (category_id, name) FROM stdin;
1	Books
2	Films, TV, Music & Games
3	Electronics & Computers
4	Home, Garden, Pets & DIY
5	Toys, Children & Baby
6	Clothes, Shoes, Jewellery and Accessories
7	Sports & Outdoors
8	Health & Beauty
\.

COPY public.companies (company_id, name, year_founded) FROM stdin;
3	Orange Inc.	1995
1	Macrohard Corporation	1997
4	Bodymagazine Incorporation	2001
2	Nile.com	2021
5	Nikola Inc	2010
6	Forty Thieves	1976
7	Samson	1979
8	Visage Inc.	1999
9	Jackson & Jackson	1984
10	LeveeShop	1948
11	ResidenceCenter	1972
12	TheAir	1999
13	Mudbrick Inc	1978
14	Seer Corporation	2003
15	Victoria Inc.	1987
16	Mercury	2003
\.

COPY public.country (id, iso, name, nicename, iso3) FROM stdin;
1	AF	AFGHANISTAN	Afghanistan	AFG
2	AL	ALBANIA	Albania	ALB
3	DZ	ALGERIA	Algeria	DZA
4	AS	AMERICAN SAMOA	American Samoa	ASM
5	AD	ANDORRA	Andorra	AND
6	AO	ANGOLA	Angola	AGO
7	AI	ANGUILLA	Anguilla	AIA
8	AQ	ANTARCTICA	Antarctica	ATA
9	AG	ANTIGUA AND BARBUDA	Antigua and Barbuda	ATG
10	AR	ARGENTINA	Argentina	ARG
11	AM	ARMENIA	Armenia	ARM
12	AW	ARUBA	Aruba	ABW
13	AU	AUSTRALIA	Australia	AUS
14	AT	AUSTRIA	Austria	AUT
15	AZ	AZERBAIJAN	Azerbaijan	AZE
16	BS	BAHAMAS	Bahamas	BHS
17	BH	BAHRAIN	Bahrain	BHR
18	BD	BANGLADESH	Bangladesh	BGD
19	BB	BARBADOS	Barbados	BRB
20	BY	BELARUS	Belarus	BLR
21	BE	BELGIUM	Belgium	BEL
22	BZ	BELIZE	Belize	BLZ
23	BJ	BENIN	Benin	BEN
24	BM	BERMUDA	Bermuda	BMU
25	BT	BHUTAN	Bhutan	BTN
26	BO	BOLIVIA	Bolivia	BOL
27	BA	BOSNIA AND HERZEGOVINA	Bosnia and Herzegovina	BIH
28	BW	BOTSWANA	Botswana	BWA
29	BV	BOUVET ISLAND	Bouvet Island	BVT
30	BR	BRAZIL	Brazil	BRA
31	IO	BRITISH INDIAN OCEAN TERRITORY	British Indian Ocean Territory	IOT
32	BN	BRUNEI DARUSSALAM	Brunei Darussalam	BRN
33	BG	BULGARIA	Bulgaria	BGR
34	BF	BURKINA FASO	Burkina Faso	BFA
35	BI	BURUNDI	Burundi	BDI
36	KH	CAMBODIA	Cambodia	KHM
37	CM	CAMEROON	Cameroon	CMR
38	CA	CANADA	Canada	CAN
39	CV	CAPE VERDE	Cape Verde	CPV
40	KY	CAYMAN ISLANDS	Cayman Islands	CYM
41	CF	CENTRAL AFRICAN REPUBLIC	Central African Republic	CAF
42	TD	CHAD	Chad	TCD
43	CL	CHILE	Chile	CHL
44	CN	CHINA	China	CHN
45	CX	CHRISTMAS ISLAND	Christmas Island	CXR
46	CC	COCOS (KEELING) ISLANDS	Cocos (Keeling) Islands	\N
47	CO	COLOMBIA	Colombia	COL
48	KM	COMOROS	Comoros	COM
49	CG	CONGO	Congo	COG
50	CD	CONGO, THE DEMOCRATIC REPUBLIC OF THE	Congo, the Democratic Republic of the	COD
51	CK	COOK ISLANDS	Cook Islands	COK
52	CR	COSTA RICA	Costa Rica	CRI
53	CI	COTE D'IVOIRE	Cote D'Ivoire	CIV
54	HR	CROATIA	Croatia	HRV
55	CU	CUBA	Cuba	CUB
56	CY	CYPRUS	Cyprus	CYP
57	CZ	CZECHIA	Czech Republic	CZE
58	DK	DENMARK	Denmark	DNK
59	DJ	DJIBOUTI	Djibouti	DJI
60	DM	DOMINICA	Dominica	DMA
61	DO	DOMINICAN REPUBLIC	Dominican Republic	DOM
62	EC	ECUADOR	Ecuador	ECU
63	EG	EGYPT	Egypt	EGY
64	SV	EL SALVADOR	El Salvador	SLV
65	GQ	EQUATORIAL GUINEA	Equatorial Guinea	GNQ
66	ER	ERITREA	Eritrea	ERI
67	EE	ESTONIA	Estonia	EST
68	ET	ETHIOPIA	Ethiopia	ETH
69	FK	FALKLAND ISLANDS (MALVINAS)	Falkland Islands (Malvinas)	FLK
70	FO	FAROE ISLANDS	Faroe Islands	FRO
71	FJ	FIJI	Fiji	FJI
72	FI	FINLAND	Finland	FIN
73	FR	FRANCE	France	FRA
74	GF	FRENCH GUIANA	French Guiana	GUF
75	PF	FRENCH POLYNESIA	French Polynesia	PYF
76	TF	FRENCH SOUTHERN TERRITORIES	French Southern Territories	ATF
77	GA	GABON	Gabon	GAB
78	GM	GAMBIA	Gambia	GMB
79	GE	GEORGIA	Georgia	GEO
80	DE	GERMANY	Germany	DEU
81	GH	GHANA	Ghana	GHA
82	GI	GIBRALTAR	Gibraltar	GIB
83	GR	GREECE	Greece	GRC
84	GL	GREENLAND	Greenland	GRL
85	GD	GRENADA	Grenada	GRD
86	GP	GUADELOUPE	Guadeloupe	GLP
87	GU	GUAM	Guam	GUM
88	GT	GUATEMALA	Guatemala	GTM
89	GN	GUINEA	Guinea	GIN
90	GW	GUINEA-BISSAU	Guinea-Bissau	GNB
91	GY	GUYANA	Guyana	GUY
92	HT	HAITI	Haiti	HTI
93	HM	HEARD ISLAND AND MCDONALD ISLANDS	Heard Island and Mcdonald Islands	HMD
94	VA	HOLY SEE (VATICAN CITY STATE)	Holy See (Vatican City State)	VAT
95	HN	HONDURAS	Honduras	HND
96	HK	HONG KONG	Hong Kong	HKG
97	HU	HUNGARY	Hungary	HUN
98	IS	ICELAND	Iceland	ISL
99	IN	INDIA	India	IND
100	ID	INDONESIA	Indonesia	IDN
101	IR	IRAN, ISLAMIC REPUBLIC OF	Iran, Islamic Republic of	IRN
102	IQ	IRAQ	Iraq	IRQ
103	IE	IRELAND	Ireland	IRL
104	IL	ISRAEL	Israel	ISR
105	IT	ITALY	Italy	ITA
106	JM	JAMAICA	Jamaica	JAM
107	JP	JAPAN	Japan	JPN
108	JO	JORDAN	Jordan	JOR
109	KZ	KAZAKHSTAN	Kazakhstan	KAZ
110	KE	KENYA	Kenya	KEN
111	KI	KIRIBATI	Kiribati	KIR
112	KP	KOREA, DEMOCRATIC PEOPLE'S REPUBLIC OF	Korea, Democratic People's Republic of	PRK
113	KR	KOREA, REPUBLIC OF	Korea, Republic of	KOR
114	KW	KUWAIT	Kuwait	KWT
115	KG	KYRGYZSTAN	Kyrgyzstan	KGZ
116	LA	LAO PEOPLE'S DEMOCRATIC REPUBLIC	Lao People's Democratic Republic	LAO
117	LV	LATVIA	Latvia	LVA
118	LB	LEBANON	Lebanon	LBN
119	LS	LESOTHO	Lesotho	LSO
120	LR	LIBERIA	Liberia	LBR
121	LY	LIBYAN ARAB JAMAHIRIYA	Libyan Arab Jamahiriya	LBY
122	LI	LIECHTENSTEIN	Liechtenstein	LIE
123	LT	LITHUANIA	Lithuania	LTU
124	LU	LUXEMBOURG	Luxembourg	LUX
125	MO	MACAO	Macao	MAC
126	MK	NORTH MACEDONIA	North Macedonia	MKD
127	MG	MADAGASCAR	Madagascar	MDG
128	MW	MALAWI	Malawi	MWI
129	MY	MALAYSIA	Malaysia	MYS
130	MV	MALDIVES	Maldives	MDV
131	ML	MALI	Mali	MLI
132	MT	MALTA	Malta	MLT
133	MH	MARSHALL ISLANDS	Marshall Islands	MHL
134	MQ	MARTINIQUE	Martinique	MTQ
135	MR	MAURITANIA	Mauritania	MRT
136	MU	MAURITIUS	Mauritius	MUS
137	YT	MAYOTTE	Mayotte	MYT
138	MX	MEXICO	Mexico	MEX
139	FM	MICRONESIA, FEDERATED STATES OF	Micronesia, Federated States of	FSM
140	MD	MOLDOVA, REPUBLIC OF	Moldova, Republic of	MDA
141	MC	MONACO	Monaco	MCO
142	MN	MONGOLIA	Mongolia	MNG
143	MS	MONTSERRAT	Montserrat	MSR
144	MA	MOROCCO	Morocco	MAR
145	MZ	MOZAMBIQUE	Mozambique	MOZ
146	MM	MYANMAR	Myanmar	MMR
147	NA	NAMIBIA	Namibia	NAM
148	NR	NAURU	Nauru	NRU
149	NP	NEPAL	Nepal	NPL
150	NL	NETHERLANDS	Netherlands	NLD
151	AN	NETHERLANDS ANTILLES	Netherlands Antilles	ANT
152	NC	NEW CALEDONIA	New Caledonia	NCL
153	NZ	NEW ZEALAND	New Zealand	NZL
154	NI	NICARAGUA	Nicaragua	NIC
155	NE	NIGER	Niger	NER
156	NG	NIGERIA	Nigeria	NGA
157	NU	NIUE	Niue	NIU
158	NF	NORFOLK ISLAND	Norfolk Island	NFK
159	MP	NORTHERN MARIANA ISLANDS	Northern Mariana Islands	MNP
160	NO	NORWAY	Norway	NOR
161	OM	OMAN	Oman	OMN
162	PK	PAKISTAN	Pakistan	PAK
163	PW	PALAU	Palau	PLW
164	PS	PALESTINIAN TERRITORY, OCCUPIED	Palestinian Territory, Occupied	\N
165	PA	PANAMA	Panama	PAN
166	PG	PAPUA NEW GUINEA	Papua New Guinea	PNG
167	PY	PARAGUAY	Paraguay	PRY
168	PE	PERU	Peru	PER
169	PH	PHILIPPINES	Philippines	PHL
170	PN	PITCAIRN	Pitcairn	PCN
171	PL	POLAND	Poland	POL
172	PT	PORTUGAL	Portugal	PRT
173	PR	PUERTO RICO	Puerto Rico	PRI
174	QA	QATAR	Qatar	QAT
175	RE	REUNION	Reunion	REU
176	RO	ROMANIA	Romania	ROU
177	RU	RUSSIAN FEDERATION	Russian Federation	RUS
178	RW	RWANDA	Rwanda	RWA
179	SH	SAINT HELENA	Saint Helena	SHN
180	KN	SAINT KITTS AND NEVIS	Saint Kitts and Nevis	KNA
181	LC	SAINT LUCIA	Saint Lucia	LCA
182	PM	SAINT PIERRE AND MIQUELON	Saint Pierre and Miquelon	SPM
183	VC	SAINT VINCENT AND THE GRENADINES	Saint Vincent and the Grenadines	VCT
184	WS	SAMOA	Samoa	WSM
185	SM	SAN MARINO	San Marino	SMR
186	ST	SAO TOME AND PRINCIPE	Sao Tome and Principe	STP
187	SA	SAUDI ARABIA	Saudi Arabia	SAU
188	SN	SENEGAL	Senegal	SEN
189	RS	SERBIA	Serbia	SRB
190	SC	SEYCHELLES	Seychelles	SYC
191	SL	SIERRA LEONE	Sierra Leone	SLE
192	SG	SINGAPORE	Singapore	SGP
193	SK	SLOVAKIA	Slovakia	SVK
194	SI	SLOVENIA	Slovenia	SVN
195	SB	SOLOMON ISLANDS	Solomon Islands	SLB
196	SO	SOMALIA	Somalia	SOM
197	ZA	SOUTH AFRICA	South Africa	ZAF
198	GS	SOUTH GEORGIA AND THE SOUTH SANDWICH ISLANDS	South Georgia and the South Sandwich Islands	SGS
199	ES	SPAIN	Spain	ESP
200	LK	SRI LANKA	Sri Lanka	LKA
201	SD	SUDAN	Sudan	SDN
202	SR	SURINAME	Suriname	SUR
203	SJ	SVALBARD AND JAN MAYEN	Svalbard and Jan Mayen	SJM
204	SZ	SWAZILAND	Swaziland	SWZ
205	SE	SWEDEN	Sweden	SWE
206	CH	SWITZERLAND	Switzerland	CHE
207	SY	SYRIAN ARAB REPUBLIC	Syrian Arab Republic	SYR
208	TW	TAIWAN, PROVINCE OF CHINA	Taiwan, Province of China	TWN
209	TJ	TAJIKISTAN	Tajikistan	TJK
210	TZ	TANZANIA, UNITED REPUBLIC OF	Tanzania, United Republic of	TZA
211	TH	THAILAND	Thailand	THA
212	TL	TIMOR-LESTE	Timor-Leste	TLS
213	TG	TOGO	Togo	TGO
214	TK	TOKELAU	Tokelau	TKL
215	TO	TONGA	Tonga	TON
216	TT	TRINIDAD AND TOBAGO	Trinidad and Tobago	TTO
217	TN	TUNISIA	Tunisia	TUN
218	TR	TURKEY	Turkey	TUR
219	TM	TURKMENISTAN	Turkmenistan	TKM
220	TC	TURKS AND CAICOS ISLANDS	Turks and Caicos Islands	TCA
221	TV	TUVALU	Tuvalu	TUV
222	UG	UGANDA	Uganda	UGA
223	UA	UKRAINE	Ukraine	UKR
224	AE	UNITED ARAB EMIRATES	United Arab Emirates	ARE
225	GB	UNITED KINGDOM	United Kingdom	GBR
226	US	UNITED STATES	United States	USA
227	UM	UNITED STATES MINOR OUTLYING ISLANDS	United States Minor Outlying Islands	UMI
228	UY	URUGUAY	Uruguay	URY
229	UZ	UZBEKISTAN	Uzbekistan	UZB
230	VU	VANUATU	Vanuatu	VUT
231	VE	VENEZUELA	Venezuela	VEN
232	VN	VIET NAM	Viet Nam	VNM
233	VG	VIRGIN ISLANDS, BRITISH	Virgin Islands, British	VGB
234	VI	VIRGIN ISLANDS, U.S.	Virgin Islands, U.s.	VIR
235	WF	WALLIS AND FUTUNA	Wallis and Futuna	WLF
236	EH	WESTERN SAHARA	Western Sahara	ESH
237	YE	YEMEN	Yemen	YEM
238	ZM	ZAMBIA	Zambia	ZMB
239	ZW	ZIMBABWE	Zimbabwe	ZWE
240	ME	MONTENEGRO	Montenegro	MNE
241	XK	KOSOVO	Kosovo	XKX
242	AX	ALAND ISLANDS	Aland Islands	ALA
243	BQ	BONAIRE, SINT EUSTATIUS AND SABA	Bonaire, Sint Eustatius and Saba	BES
244	CW	CURACAO	Curacao	CUW
245	GG	GUERNSEY	Guernsey	GGY
246	IM	ISLE OF MAN	Isle of Man	IMN
247	JE	JERSEY	Jersey	JEY
248	BL	SAINT BARTHELEMY	Saint Barthelemy	BLM
249	MF	SAINT MARTIN	Saint Martin	MAF
250	SX	SINT MAARTEN	Sint Maarten	SXM
251	SS	SOUTH SUDAN	South Sudan	SSD
\.


COPY public.customers (customer_id, first_name, last_name, username, supersecretword, salt, email) FROM stdin;
18	Testy	Tester	test	f6f976a0a1e92e5a3a00b1b78339e05a19046b4bdd193d8ac6a5a822fc99fb680bfc11560766e1ba6a37cf1a2cf767597d43cb28b75036cbfac16187fb665b91	4eea2dab68f8ec	test@test.com
\.

COPY public.orders (order_id, customer_id, date_ordered, date_delivered) FROM stdin;
8385983f-103f-441a-baa6-f0628478d941	18	2021-05-14 15:33:13.867+02	\N
a0affb6e-a451-4a42-a343-4f18a0da3501	18	2021-05-14 15:40:14.639+02	\N
39943334-1ddd-434c-b35e-01e9633dc977	18	2021-05-14 15:53:11.207+02	\N
\.

COPY public.orders_products (order_id, product_id, quantity) FROM stdin;
8385983f-103f-441a-baa6-f0628478d941	75	1
a0affb6e-a451-4a42-a343-4f18a0da3501	80	3
39943334-1ddd-434c-b35e-01e9633dc977	75	3
39943334-1ddd-434c-b35e-01e9633dc977	58	2
\.

COPY public.products (product_id, name, stock_amount, company_id, description, price, category, score, ratings, creator, year, image) FROM stdin;
16	John Henry (Album)	85	1	Their fifth album, and the first to include a full band arangement and their longest work to date.	5.99	2	35	340	They Might Be Giants	1994	brett-jordan-2YGz-uar7Mc-unsplash.webp
1	Lissabon On Tour (German Language Version)	21	4	This book details eleven distinct and individual tours through the metropolis.	13.99	1	47	10	PolyGlott	2015	claudio-schwarz-purzlbaum-eyV7mOOVeXM-unsplash.webp
3	The Fellowship of the Ring	300	2	The first book in the epic fantasy trilogy - detailing Frodos journey with the ring to Rivendell and beyond.	9.99	1	49	10231	J.R.R. Tolkien	2015	madalyn-cox-aJkFP5Q1eus-unsplash.webp
2	The Startup Owners Manual	54	2	This step-by-step guide informs readers about everything they need to know regarding building a great company.	21.99	1	45	3421	Blank & Dorf	2019	clayton-cardinalli-gU6E6s1MmrU-unsplash.webp
4	Harry Potter and the Order of the Phoenix	322	2	Explore Harrys fifth year in Hogwarts with the fifth book in the series - now that Voldemort is back, how will the wizarding world respond?	13.99	1	49	12341	J.K. Rowling	2004	madalyn-cox-aJkFP5Q1eus-unsplash.webp
5	Harry Potter (Books 1-7)	25	2	The complete series, all in one package. Enjoy Harrys adventure through the wizarding world, from years one to seven.	99.91	1	41	321	J.K. Rowling	2020	madalyn-cox-YuUz5uQkaXM-unsplash.webp
6	James and the Giant Peach	356	2	A favourite of children across the globe - one of the master storytellers most acclaimed works - in paperback form with illustrations by the wonderful Quentin Blake.	7.99	1	49	5548	Roald Dahl	2005	sincerely-media-BJH8ukhAqyg-unsplash.webp
7	Milk and Honey	89	2	The New York Times best selling author presents his collection of poetry and prose themed around survival.	10.99	1	39	670	Rupi Kaur	2017	sincerely-media-CXYPfveiuis-unsplash.webp
8	Gods Leading Lady	342	2	The #1 best selling author offers women a plan for taking charge of their lives.	13.50	1	42	853	T.D. Jakes	2002	sincerely-media-mUgst4U4ZKM-unsplash.webp
9	Nightmare Academy	84	2	The second iteration in the Veritas Project series - the only way to solve the case is to step inside the nightmare.	12.99	1	34	32	Frank Peretti	2013	sincerely-media-On2EsGQpuJo-unsplash.webp
10	Love Skip Jump	450	2	Start living the adventure of yes - with a foreword by Francis Chan, best-selling author of Crazy Love.	7.99	1	45	5940	Shelene Bryan	2015	sincerely-media-TwjZ62z58EQ-unsplash.webp
11	Good or God?	666	2	Its sold over 100,000 copies in print, and from the best-selling author of The Bait of Satan - this time why you can be good without god.	17.35	1	37	3130	John Bevere	2018	sincerely-media-Xy4MuP-Zp7A-unsplash.webp
12	Your Soul Is A River	301	2	This is a book about the journey of healing from trauma and becoming whole again. Directions: apply to your soul gently, whilst sitting under the stars.	14.99	1	32	3001	Nikita Gill	2020	thought-catalog-DxAzOKSiPoE-unsplash.webp
13	101 Essays That Will Change The Way You Think	250	2	Deeply moving, philosophical prose that will change your life forever - or your money back.	8.50	1	46	2031	Brianna Wiest	2015	thought-catalog-V5BGaJ0VaLU-unsplash.webp
14	Harry Potter and the Prisoner of Azkabahn	504	2	Harry enters his third year at Hogwarts after a narrow escape in his second year - with the small caveat that one of Voldemorts henchmen, a mass-murderer, has escaped from prison, seemingly with the sole intent of finishing the job his master could not.	10.50	1	49	20033	J.K. Rowling	2001	zoe-1nYWu8_s3dE-unsplash.webp
15	Game Gear	21	1	A portable video game system that ensures you can enjoy your favourite games on the go.	249.99	2	42	1340	Sega	1993	ben-8CLtHSdiPE4-unsplash.webp
17	Queen Five Album Set	462	1	The British rock bands first five albums on CD, with the classic line-up of Mercury, May, Taylor and Deacon.	79.99	2	48	9785	Queen	2001	brett-jordan-hViWIVR-aIM-unsplash.webp
20	Nintendo Switch Joycon Set	593	1	Set of two JoyCons for the Nintendo Switch, Mario Red and Aqua Blue colour.	99.99	2	32	3503	Nintendo	2020	caleb-woods-fpmV3dQPUvU-unsplash.webp
18	The Complete Sun Masters	9	1	Three CD anthology of Johnnys recordings for the legendary Sun Records label. Filled with finished masters, alternate takes, demos and more rarities, this is the absolute finest collection of Johnnys early recordings available.	29.99	2	45	3312	Johnny Cash	2018	brett-jordan-U-pM7rAwDzo-unsplash.webp
19	Friends: The Complete Series Collection	123	1	This is a show about love and sex and careers and a time in life when everything is possible. Most of all, its about friendship - for when you are young and single in the city, your friends are your family.	59.96	2	49	16787	WB	2015	brett-jordan-ydaEsk6WNBw-unsplash.webp
21	Game Boy Color (Green)	13	1	The revolutionary portable console - with full-colour games and portable design. Lime-Green Colour version.	120.99	2	43	13231	Nintendo	1997	elias-castillo-1qx2J3TsRsk-unsplash.webp
25	Game Boy and Tetris	53	1	The original Game Boy and the worlds best selling game - Tetris - in one package at discount price.	225.99	2	49	764533	Nintendo	1992	hello-i-m-nik-lUbIun4IL38-unsplash.webp
23	DMX - The Smoke Out Festival Presents	213	1	Vinyl, LP, 45 RPM, Album, Limited Edition, Numbered, Stereo, Yellow, 180 gram	32.99	2	36	754	Ear Music Classics	2019	erik-mclean-tR-4K1Cq7dg-unsplash.webp
24	PlayStation One	67	1	The original - the first console of any type to ship over 100 million units, doing so in under a decade.	299.99	2	47	34142	PlayStation	1994	hello-i-m-nik-b-bnM85Z35o-unsplash.webp
26	Dont Need You (Limited Edition)	500	1	Limited edition, store day 2017 record release with etched B-side	99.99	2	39	213	Bullet For My Valentine	2017	mick-haupt-pZhSat_yd4U-unsplash.webp
22	PlayStation Portable (PSP)	34	1	Advanced graphics capabilities make it a popular mobile entertainment device, which can connect to the PlayStation 2 and PlayStation 3 consoles, any computer with USB interface, other PSP systems, and the Internet. 	249.99	2	48	31223	PlayStation	2003	engin-akyurt--zdRxXJfl9E-unsplash.webp
27	Steal This Album	321	1	The third studio album by Armenian-American heavy metal band System of a Down, Steal This Album LP Version, Parental Advisory Explicit Content.	21.99	2	43	8743	System Of A Down	2001	sebastian-cyrman-p43NEFmcWkI-unsplash.webp
58	Super Mario Toy	5412	2	Authentic licenced Super Mario figures, featuring your favourite plumber and his comrades and foes.	13.99	5	45	59341	null	2021	ryan-quintal-xioKwVlp5jE-unsplash.webp
59	Wooden Letter Blocks (A-Z)	2012	10	Oak letter blocks, blue, red, yellow, green. Classic design.	49.99	5	40	40212	null	2002	susan-holt-simpson-H7SCRwU1aiM-unsplash.webp
29	Maveric Drone	543	8	A drone that redfines the limits when it comes to aerial photography.	1325.99	3	49	4217	null	2019	benjamin-catapane-CK-eqM6h_Cg-unsplash.webp
42	Organic Compost	300	11	Fresh, vegan, gluten-free, chemical-free, organic compost for use indoors and out.	22.20	4	19	9785	null	2021	heather-ford-nHTZLszh2No-unsplash.webp
28	Condenser Microphone	131	7	The lightweight membrane provides an extended frequency response, excellent transient response and high sound level tolerance. Due to the low inherent noise, the microphone is perfectly suited for the needs of modern digital recording applications. 	89.00	3	49	7244	null	2020	axel-mencia-5SoYbzKhqfA-unsplash.webp
30	Professional Operating System Disc	398	1	A business-oriented operating system, the most modern and most secure of its kind.	124.99	3	32	8743	null	2000	brett-jordan-eYNcM172214-unsplash.webp
31	Supercomputer Operating System Disc	312	3	This new revision includes dual-processor 450 MHz and 500 MHz versions, and a low-end single CPU 400 MHz model. It is also the first personal computer to include gigabit Ethernet as standard. 	115.32	3	35	7684	null	1999	brett-jordan-QBCx3GbFfU4-unsplash.webp
32	Bluetooth Headphones	523	6	Instant high quality audio listening device that uses top of the line audio technology and provides you with an immersive listening experience. The headphones are designed to be comfortable even after hours of listening.	69.99	3	36	34512	null	2019	c-d-x-PDX_a_82obo-unsplash.webp
33	Wired Earphones	318	7	The earphones come in a very elegant design that gives you rich bass and fits perfectly on your ears. The built and construction of the device are premium and it has thick pads on the earmuffs that make for a comfortable and immersive listening experience.	39.98	3	32	7854	null	2021	jocelyn-morales-lIgFLLDdqMk-unsplash.webp
34	Studio Power Speaker	120	8	High-resolution sound and authentic reproduction - for optimal production conditions. Easy adaptation to any studio environment.	569	3	43	9581	null	2015	goh-rhy-yan-0vO0z83M4bc-unsplash.webp
44	Ceramic Teapots (set of 3)	300	11	Set of three handmade ceramic teapots - in baby blue, granite and adobe. Perfect for serving brew in the home or garden.	28.99	4	37	954	null	2021	liz99-7EeeSN-eGsI-unsplash.webp
35	AirTop laptop\r\n	312	3	Increased performance for graphics-intensive applications. Optional backlit keyboard ensures that you can continue working regardless of the lighting conditions.	499.99	3	21	863	null	2019	kari-shea-1SAnrIxw5OY-unsplash.webp
36	Portable Waterproof Speaker	231	5	Enjoy superb audio on the go - wherever you are with over 25 hours of battery-life. Thanks to its waterproof design, you can even enjoy your favourite tunes in the shower!	49.99	3	45	8954	null	2021	omar-flores-eMw1fBx4_Wk-unsplash.webp
37	Retro Vinyl Player	150	14	The first integrated high-fidelity turntable system with an integrated, high-performance stereo music system with high-quality phono components and advanced hearing functions. 	334.99	3	46	3213	null	2015	victrola-record-players-R4Rdi0EfBws-unsplash.webp
38	Spider Plant	200	6	Lush, spider plant delivered in premium pattern pot.	12.99	4	38	1298	null	2021	abel-y-costa-jb-SMviXCjI-unsplash.webp
39	Chewable Dog Toy	350	4	Safe, squishable dog toy. Machine washable, with anti-choke techology to ensure your dog just has a fantastic time.	3.99	4	45	35434	null	2020	chris-jarvis-VQy7AxjWsIE-unsplash.webp
40	Stainless Steel Frying Pan	303	9	Non-stick, dishwasher proof stainless steel frying pan - for all of your culinary needs. Three year warranty, real wood handle (Birch).	15.50	4	40	8756	null	2020	cooker-king-zEgp30gYpKk-unsplash.webp
41	Mint Plant (set of 5)	450	6	Five mint plants to freshen up your home! Water generously, no pot included. Safe to use in numerous culinary applications.	19.99	4	30	3948	null	2020	eleanor-chen-IytUViSv3GQ-unsplash.webp
45	Spanner (size 20)	73	11	Stainless steel spanner made in the USA, size 20.	8.50	4	41	32123	null	2019	matt-artz-pH6wLT6TVFc-unsplash.webp
43	Hammer	245	11	High quality materials forged from one piece - for the highest demands! Multi-layer special leather handle, perfect adaptation to the shape of the hand. 	32.21	4	11	321	null	2017	jozsef-hocza-D3nouOYbALc-unsplash.webp
46	Ball of Green Thread	897	11	500m of pastel green thread, high-quality, perfect for sewing.	5.99	4	49	6483	null	2015	paula-heckathorn-0yz1EnvfMfw-unsplash.webp
47	Peace Lilly (Spathiphyllum) with pot	120	11	Beautiful Japanese peace lily, perfect for revitalising any interior space and providing an ethos of calm.	14.99	4	43	4958	null	2020	severin-candrian-lmczPemWjQQ-unsplash.webp
48	Phillips Screwdriver (Size 5)	201	11	Red plastic handle, anti-slip grip, non-changeable head.	7.99	4	47	2099	null	2014	tekton-jlY6nV_STIw-unsplash.webp
49	Cast Iron Pot with Lid	431	6	Machine-washable, cast iron pot, 10-year warranty. 	14.99	4	14	7501	null	2019	the-creative-exchange-oQEVnA7D3Uk-unsplash.webp
50	Toy Digger	213	10	Plastic, scale-model. Operable wheels and realistic digging action.	4.50	5	43	5293	null	2020	adi-nugroho-xpdMcN3FBW0-unsplash.webp
51	Soft Bear	341	10	Soft, huggable bear. Pilot-style goggles and scarf. Machine-washable.	32.50	5	48	39212	null	2019	barrett-ward-1qQx3LHaYGg-unsplash.webp
52	Racing Cars	453	10	Wind-up drive, speeds up to 1m/s, no batteries required. Available in four different colours.	7.99	5	41	7831	null	2018	girl-with-red-hat-Xxg-r574pLE-unsplash.webp
53	Model Train Track Set	213	8	Customisable track set made from wood. Contains 50 pieces and train, arrangable in  up to 5000 combinations!	23.23	5	39	60102	null	2005	jason-leung-M55JcA9wOG0-unsplash.webp
54	Huggable Avocado	593	12	The Huggable Avocado is not just fluffy and lovable - he also teaches kids about good diets and eating habits with his 5 sayings - batteries required.	42.99	5	49	45192	null	2021	joshua-coleman-8V4y-XXT3MQ-unsplash.webp
55	Replica London Telephone Box	3012	6	Scale (1:10) replica of iconic London phonebox, full metal construction.	12.99	5	44	21221	null	2020	louana-rose-g9c-N07OYKo-unsplash.webp
56	MyBunny Toy	21212	4	100% huggable toy, machine washable, perfect for children of all ages.	14.21	5	47	1891	null	2020	mockup-graphics-aUkYaG12Dgs-unsplash.webp
57	Windup Robot	293	9	This wind-up robot sings about physics - the perfect way to educate young children with a toy. Suitable for ages 8 and up.	15.99	5	14	201	null	2021	rock-n-roll-monkey-FTfjMijq-Ws-unsplash.webp
60	Assorted building block pieces	201021	2	Randomic building block pieces. Random shape, colour, size. Price per piece.	0.05	5	5	2014591	null	2009	xavi-cabrera-kn-UmDZQDjM-unsplash.webp
61	Plain White T-Shirt	721221	9	Plain white t-shirt, for men, variety of sizes.	4.99	6	40	9859	null	2020	anomaly-WWesmHEgXDs-unsplash.webp
62	Silver Earrings	100	6	Silver earrings set with rare stone of your choice - sapphire, ruby, diamond, emerald.	120.00	6	39	20312	null	2021	arteum-ro-GKbfUFna-9I-unsplash.webp
63	Classic Retro Jacket	200	5	Retro jacket, bomber style, with hood. Waterproof, variety of sizes.	215.00	6	26	874	null	2020	carlos-andres-gomez-m3RxZs9TsO4-unsplash.webp
64	Gold Ring Set	60	16	Set of three gold rings, with diamond encrusted emboss.	333.00	6	41	20123	null	2021	cornelia-ng-zZLhoEwGCeM-unsplash.webp
65	Girls Denim Jacket	201	9	Authentic Denim Jacket, sky-blue, ages 10-15.	52.99	6	46	9841	null	2021	david-suarez-ZPoRsYK2r-M-unsplash.webp
66	Womens Denim Shorts	451	12	Ripped womens Denim shorts, variety of styles. Copper button.	75.90	6	43	7584	null	2021	engin-akyurt-Hd4nlxLgIbA-unsplash.webp
67	Limited Edition Replica Air Shoes	100	15	Authentic limited edition air replica shoes, sizes 8-14 while stocks last, baby blue, white, and orange design.	99.99	6	12	9210	null	2021	erik-mclean--iJgjj33eEk-unsplash.webp
68	High Society Dress	120	4	Crimson womens dress, sizes 38-42, perfect for parties, dinners, and nights out.	32.99	6	32	4413	null	2021	kate-skumen-PJRabkuH3_Q-unsplash.webp
69	Alpaca Wool Coat	60	6	Super-soft authentic alpaca wool jacket, keeps you warm in the winter and dry if the weather worsens. Includes hood.	120.00	6	47	5612	null	2021	kristina-tamasauskaite-Xd5DL2tASeE-unsplash.webp
70	Woven Sunhat	520	10	Handwoven sunhat, ideal for summer, waterproof.	22.99	6	32	982	null	2020	michael-c-zVycYmcblDY-unsplash.webp
71	Beanie (Black)	5000	4	Synthetic beanie, one-size-fits-all. Snug fit, modelled by Taylor Lautner. 	5.99	6	49	2412	null	2008	rafael-silva-fc2Q2DKBCYY-unsplash.webp
72	Summer Dress	212	16	Red summer dress, variety of sizes, slim fit, regardless of body type. Floral pattern in yellow and purple.	39.99	6	29	7432	null	2020	ussama-azam-xgNSlx7DjYM-unsplash.webp
73	Pink Yoga Mat	300	8	Pink yoga mat, 190cm x 80cm. Non-slip underside, waterproof and non-absorbant top-side.	18.99	7	49	4765	null	2009	alex-shaw-ldpBiWRiVZ4-unsplash.webp
74	Asite Rollerblades	499	16	Lime green rollerblades, suitable for a variety of surfaces. Sizes 8-12, adjustable design.	34.99	7	32	1232	null	2015	a-zuhri-GJBuQBYA1KE-unsplash.webp
75	Basketball	4003	2	Wilson Basketball, intermediate Size, NCAA, all-surface attack.	12.99	7	43	9423	null	2013	ben-hershey-5nk3wSFUWZc-unsplash.webp
76	Tennis Ball (set of 50)	10500	5	Set of 50 tennis balls (loose), grass-green, standard size. Perfect for tennis.	19.99	7	45	5412	null	2005	ben-hershey-K9HgyI3qmqA-unsplash.webp
77	Hunter Limited Edition Football Boots	98	15	Limited edition Hunter football boots, with ankle sock, plastic moulded studs and spin-grip design.	150.00	7	39	4222	null	2020	braden-hopkins-sC-AbZG-Sec-unsplash.webp
78	ILS Tennis Racket	124	5	Authentic tennis racket, professional non-slip grip, stainless-steel, fluorescent yellow design.	64.59	7	44	9412	null	2021	josephine-gasser-cv83wpGtFtg-unsplash.webp
79	Skateboard	941	13	Red, whale shape, super-solid large wheels ensure rotation on a variety of surfaces.	59.99	7	37	212	null	2009	max-tarkhov-NG4684I8Bng-unsplash.webp
80	Mika Volleyball	2031	2	Professional size 4 volleyball, licenced product, comes with repair kit and carry-bag.	14.99	7	48	8412	null	2015	miguel-teirlinck-VDkRsT649C0-unsplash.webp
81	Okai Scooter	745	7	City-scooter, battery-powered, with lights and bell. Disc brakes, top-speed of 30m/s.	199.99	7	49	9929	null	2021	okai-vehicles-BwuDAkGSWSU-unsplash.webp
82	Geot Racing Bicycle	82	16	Racing Bicycle, one speed, reverse-pedal brake, super-light weight construction.	1999.99	7	35	821	null	2021	robert-bye-tG36rvCeqng-unsplash.webp
83	Used Football	21	15	Used size 5 football. Showing signs of wear. 	2.99	7	12	992	null	2021	wesley-tingey-dKCKiC0BQtU-unsplash.webp
84	BRN Make-up Kit	203	8	Burnished gold and pink make-up kit, includes lipstick, hair-tie, make-up brush, and more!	24.99	8	48	9212	null	2021	amy-shamblen-xwM61TPMlYk-unsplash.webp
85	Herbal Skincare Set	934	8	Set of 6 skincare products, the perfect solution to imperfect skin.	39.99	8	40	2134	null	2020	charisse-kenion-3bdSGpKVAmk-unsplash.webp
86	HomeOil (500ml)	100	14	Licenced CBD home oil, helps against sunburn, peeling, and more.	18.99	8	39	921	null	2019	chelsea-shapouri-r40EYKVyutI-unsplash.webp
87	HOT Lipstick	2933	4	Hot-pink lipstick, 50ml. Does not mark clothes.	12.99	8	22	6421	null	2018	daniele-franchi-YBQY-hdd-Yg-unsplash.webp
88	BB Limited Edition MakeUpSet	93	10	Limited to 100 items, contains two make-up brushes, Vivid Purple and Seduction Pink lipstick (20ml each), plus 30g of foundation and 50ml of eyeliner (2x25).	49.99	8	33	32	null	2019	element5-digital-ooPx1bxmTc4-unsplash.webp
89	Make-up Brushes (15)	231	2	Fifteen assorted make-up brushes. Delivery may differ from items show in product image. 	29.99	8	15	29123	null	2020	freestocks-fplnXE5loWo-unsplash.webp
90	Stethoscope	100	16	Working stethoscope, acoustic medical device for auscultation.	14.99	8	43	984	null	2018	hush-naidoo-yo01Z-9HQAw-unsplash.webp
91	Earthen Foundation	941	8	500ml of foundation in earthen pink tones, high-quality mix, tested only on humans.	35.99	8	46	9231	null	2019	joanna-kosinska-mVdzV_HTyH4-unsplash.webp
92	FitBot Fitness Tracker	54	5	Smart Bluetooth fitness tracker. 40 hours of battery, waterproof up to 50m, GPS.	99.99	8	40	745	null	2021	luke-chesser-rCOWMC8qf8A-unsplash.webp
\.

COPY public.session (sid, sess, expire) FROM stdin;
\.

SELECT pg_catalog.setval('public.categories_id_seq', 1, true);

SELECT pg_catalog.setval('public.companies_id_seq', 1, false);

SELECT pg_catalog.setval('public.customers_id_seq', 57, true);

SELECT pg_catalog.setval('public.orders_id_seq', 6, true);

SELECT pg_catalog.setval('public.products_id_seq', 1147, true);

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (category_id);

ALTER TABLE ONLY public.companies
    ADD CONSTRAINT companies_pkey PRIMARY KEY (company_id);

ALTER TABLE ONLY public.country
    ADD CONSTRAINT country_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT customers_pkey PRIMARY KEY (customer_id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (order_id);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT orders_products_pkey PRIMARY KEY (order_id, product_id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT products_pkey PRIMARY KEY (product_id);

ALTER TABLE ONLY public.session
    ADD CONSTRAINT session_pkey PRIMARY KEY (sid);


CREATE INDEX "IDX_session_expire" ON public.session USING btree (expire);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT company_id FOREIGN KEY (company_id) REFERENCES public.companies(company_id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT customer_id FOREIGN KEY (customer_id) REFERENCES public.customers(customer_id);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT fk_orders_constraint FOREIGN KEY (order_id) REFERENCES public.orders(order_id);

ALTER TABLE ONLY public.products
    ADD CONSTRAINT fk_product_category FOREIGN KEY (category) REFERENCES public.categories(category_id);

ALTER TABLE ONLY public.orders_products
    ADD CONSTRAINT fk_products FOREIGN KEY (product_id) REFERENCES public.products(product_id);

