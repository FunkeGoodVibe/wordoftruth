// 38 parables of Jesus. The {name} token will be replaced with the
// visitor's name to cast them as the "good character" of each parable.
export type Parable = {
  title: string;
  reference: string;
  // A short retelling. {name} marks where the visitor's name appears
  // as the virtuous / wise / faithful character.
  story: string;
};

export const parables: Parable[] = [
  {
    title: "The Good Samaritan",
    reference: "Luke 10:25–37",
    story:
      "When a traveller lay wounded by the road and others passed by, {name} stopped, bound the wounds, and carried the stranger to safety — neighbour to whoever was in need.",
  },
  {
    title: "The Prodigal Son",
    reference: "Luke 15:11–32",
    story:
      "When the lost child returned home in shame, {name} ran out, embraced them, and called for a feast — for what was lost had been found.",
  },
  {
    title: "The Lost Sheep",
    reference: "Luke 15:1–7",
    story:
      "With ninety-nine safely gathered, {name} left them to search the hills for the one that had wandered, and carried it home rejoicing.",
  },
  {
    title: "The Lost Coin",
    reference: "Luke 15:8–10",
    story:
      "{name} lit a lamp, swept the whole house, and searched carefully until the missing coin was found — then called the neighbours to celebrate.",
  },
  {
    title: "The Sower",
    reference: "Matthew 13:3–23",
    story:
      "{name} was the good soil — deep, willing, and ready — where the seed of the word took root and bore fruit a hundredfold.",
  },
  {
    title: "The Wheat and the Tares",
    reference: "Matthew 13:24–30",
    story:
      "When weeds grew among the wheat, {name} chose patience over haste, trusting the harvest to reveal what was true.",
  },
  {
    title: "The Mustard Seed",
    reference: "Matthew 13:31–32",
    story:
      "{name} planted the smallest of seeds with quiet faith, and in time it grew into a tree where the birds of the air came to rest.",
  },
  {
    title: "The Leaven",
    reference: "Matthew 13:33",
    story:
      "{name} was the gentle leaven worked into the dough — small, hidden, and quietly transforming the whole.",
  },
  {
    title: "The Hidden Treasure",
    reference: "Matthew 13:44",
    story:
      "{name} found a treasure buried in a field, and with great joy gave up everything to make that field their own.",
  },
  {
    title: "The Pearl of Great Price",
    reference: "Matthew 13:45–46",
    story:
      "Searching for fine pearls, {name} found one of surpassing beauty — and gladly traded all they had to possess it.",
  },
  {
    title: "The Net",
    reference: "Matthew 13:47–50",
    story:
      "{name} cast the net wide and, when it was drawn ashore, sorted with wisdom what was good and what was not.",
  },
  {
    title: "The Unmerciful Servant",
    reference: "Matthew 18:23–35",
    story:
      "Forgiven a great debt, {name} turned and forgave others freely — letting mercy beget mercy.",
  },
  {
    title: "The Workers in the Vineyard",
    reference: "Matthew 20:1–16",
    story:
      "{name}, the generous landowner, paid each worker a full day's wage — choosing kindness over comparison.",
  },
  {
    title: "The Two Sons",
    reference: "Matthew 21:28–32",
    story:
      "Asked to work in the vineyard, {name} may have hesitated at first — but in the end went, and did the father's will.",
  },
  {
    title: "The Wicked Tenants",
    reference: "Matthew 21:33–46",
    story:
      "{name} was the faithful tenant, who honoured the owner of the vineyard and returned its fruit in due season.",
  },
  {
    title: "The Wedding Banquet",
    reference: "Matthew 22:1–14",
    story:
      "When the invitation came, {name} answered without delay — dressed and ready to take a place at the king's table.",
  },
  {
    title: "The Ten Virgins",
    reference: "Matthew 25:1–13",
    story:
      "{name} was among the wise, lamps trimmed and oil in flasks, watching faithfully through the night until the bridegroom came.",
  },
  {
    title: "The Talents",
    reference: "Matthew 25:14–30",
    story:
      "Entrusted with talents, {name} did not bury what was given but used it well — and heard the words, ‘Well done, good and faithful servant.’",
  },
  {
    title: "The Sheep and the Goats",
    reference: "Matthew 25:31–46",
    story:
      "{name} fed the hungry, clothed the stranger, visited the sick — and so, without knowing it, served the King himself.",
  },
  {
    title: "The Growing Seed",
    reference: "Mark 4:26–29",
    story:
      "{name} scattered the seed and trusted the soil — sleeping and rising while it grew, in ways no one fully understood.",
  },
  {
    title: "The Watchful Servants",
    reference: "Mark 13:34–37",
    story:
      "Given charge of the house, {name} kept watch with a steady heart — ready whenever the master would return.",
  },
  {
    title: "The Two Debtors",
    reference: "Luke 7:41–43",
    story:
      "Forgiven much, {name} loved much — pouring out gratitude like costly perfume.",
  },
  {
    title: "The Friend at Midnight",
    reference: "Luke 11:5–8",
    story:
      "{name} did not give up at the closed door, but kept knocking — and so received the bread their friend had need of.",
  },
  {
    title: "The Rich Fool",
    reference: "Luke 12:16–21",
    story:
      "{name} chose to be rich toward God — opening the storehouses of the heart instead of building bigger barns.",
  },
  {
    title: "The Barren Fig Tree",
    reference: "Luke 13:6–9",
    story:
      "{name} was the patient gardener, asking for one more year — willing to dig, to tend, and to hope for fruit.",
  },
  {
    title: "The Lowest Seat at the Feast",
    reference: "Luke 14:7–11",
    story:
      "{name} took the lowest place at the table, content and unhurried — and was lifted higher by the host.",
  },
  {
    title: "The Great Banquet",
    reference: "Luke 14:15–24",
    story:
      "{name} threw open the doors and went out to the highways and lanes, gathering everyone in to share the feast.",
  },
  {
    title: "The Cost of Discipleship",
    reference: "Luke 14:28–33",
    story:
      "Before building, {name} sat down and counted the cost — and chose, with open eyes, to follow all the way.",
  },
  {
    title: "The Shrewd Manager",
    reference: "Luke 16:1–8",
    story:
      "{name} used what was passing to bless others, turning resources into friendship and grace.",
  },
  {
    title: "The Rich Man and Lazarus",
    reference: "Luke 16:19–31",
    story:
      "{name} did not pass by the one at the gate, but shared bread, and heard the cry of the poor.",
  },
  {
    title: "The Master and His Servant",
    reference: "Luke 17:7–10",
    story:
      "{name} served quietly, without seeking applause, content to say, ‘We have only done our duty.’",
  },
  {
    title: "The Persistent Widow",
    reference: "Luke 18:1–8",
    story:
      "{name} kept on praying and would not lose heart, trusting that justice would surely come.",
  },
  {
    title: "The Pharisee and the Tax Collector",
    reference: "Luke 18:9–14",
    story:
      "{name} stood with a humble heart and prayed, ‘Have mercy on me’ — and went home justified.",
  },
  {
    title: "The Pounds (Minas)",
    reference: "Luke 19:11–27",
    story:
      "Given a small sum, {name} traded faithfully — multiplying what was entrusted while waiting for the king's return.",
  },
  {
    title: "The Wise and Foolish Builders",
    reference: "Matthew 7:24–27",
    story:
      "{name} built upon the rock — and when the rains fell and the winds beat against the house, it stood firm.",
  },
  {
    title: "New Cloth and New Wineskins",
    reference: "Mark 2:21–22",
    story:
      "{name} welcomed new wine with new wineskins — making room for what God was doing fresh.",
  },
  {
    title: "The Lamp Under a Basket",
    reference: "Matthew 5:14–16",
    story:
      "{name} did not hide the light, but set it on a stand — that it might give warmth to all in the house.",
  },
  {
    title: "The Speck and the Plank",
    reference: "Matthew 7:1–5",
    story:
      "{name} tended first to their own heart — and then could see clearly to help a brother or sister with kindness.",
  },
];
