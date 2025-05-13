import DynamicMap from "@/app/components/DynamicMap";

export default async function PropertyPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const property = await fetch(
    `http://localhost:3000/api/properties/${id}`
  ).then((res) => res.json());
  console.log("PROPERTY:", property);

  return <></>;
}
