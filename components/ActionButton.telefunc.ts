const FIREBOT_API_URL = process.env.FIREBOT_API_URL;

export const onTriggerPreset = async (opt: { presetId: string; args?: Record<string, string | number> }) => {
  const res = await fetch(FIREBOT_API_URL || "http://localhost:7472/api/v1/effects/preset/" + opt.presetId, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: opt.args ? JSON.stringify({ args: opt.args }) : "{}",
  });
  return res.ok;
};
