function CultureSessionCard({ card }) {
  return (
    <div className="group relative h-48 overflow-hidden rounded-[30px] shadow-card">
      <img
        alt={card.title}
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        src={card.image}
      />
      <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-on-surface/60 to-transparent p-6">
        <p className="text-sm font-medium text-white">{card.title}</p>
        <p className="text-xs text-white/70">{card.time}</p>
      </div>
    </div>
  )
}

export default CultureSessionCard
