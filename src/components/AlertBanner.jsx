function AlertBanner({ alert }) {
  return (
    <div className="flex flex-col gap-4 rounded-[28px] border border-[#efcb8a] bg-[#fff8e8] px-5 py-4 shadow-[0_6px_18px_rgba(217,119,6,0.08)] sm:flex-row sm:items-center sm:justify-between">
      <div>
        <p className="text-sm font-bold text-[#8c4a04]">{alert.title}</p>
        <p className="text-sm text-[#b06608]">{alert.description}</p>
      </div>

      <button
        className="rounded-full bg-[#6f2c0f] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#5f250c]"
        type="button"
      >
        {alert.action}
      </button>
    </div>
  )
}

export default AlertBanner
