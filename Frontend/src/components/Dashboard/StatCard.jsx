function StatCard({ title, value }) {
  return (
    <div className="glass p-6 rounded-2xl">

      <h3 className="text-lg text-gray-300">
        {title}
      </h3>

      <p className="text-3xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}

export default StatCard;