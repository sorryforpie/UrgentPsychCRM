interface Params {
  params: { id: string };
}

export default function PatientProfile({ params }: Params) {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Patient {params.id}</h1>
    </div>
  );
}
