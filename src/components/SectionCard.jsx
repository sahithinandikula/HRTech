function SectionCard({ className = '', children }) {
  return <section className={`rounded-[30px] bg-surface-container-lowest shadow-card ${className}`}>{children}</section>
}

export default SectionCard
