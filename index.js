import "dotenv/config";
import { Client, GatewayIntentBits } from "discord.js";

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

const itemPool = {
  Common: ["🍃 Leaf", "🍄 Mushroom", "🌱 Seed"],
  Uncommon: ["🌵 Cactus", "🌼 Flower"],
  Rare: ["🌹 Rose", "🌻 Sunflower"],
  Legendary: ["🌟 Star Plant", "🔥 Fire Bloom"]
};

const dropRates = [
  { rarity: "Common", rate: 50 },
  { rarity: "Uncommon", rate: 30 },
  { rarity: "Rare", rate: 15 },
  { rarity: "Legendary", rate: 5 }
];

function getRandomRarity() {
  const rand = Math.random() * 100;
  let acc = 0;
  for (const { rarity, rate } of dropRates) {
    acc += rate;
    if (rand <= acc) return rarity;
  }
  return "Common";
}

function rollGacha() {
  const rarity = getRandomRarity();
  const items = itemPool[rarity];
  const item = items[Math.floor(Math.random() * items.length)];
  return { item, rarity };
}

client.once("ready", () => {
  console.log(`✅ Bot aktif sebagai ${client.user.tag}`);
});

client.on("messageCreate", (msg) => {
  if (msg.content === "!gacha") {
    const result = rollGacha();
    msg.reply(`🎉 Kamu mendapatkan **${result.item}** (${result.rarity})`);
  }
});

client.login(process.env.DISCORD_TOKEN);
