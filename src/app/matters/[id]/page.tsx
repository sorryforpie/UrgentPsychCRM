interface Params {
  params: { id: string };
}

export default function MatterDetail({ params }: Params) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Matter {params.id}</h1>
    </div>
  );
}
