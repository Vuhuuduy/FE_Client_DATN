type BreadCrumbProps = {
  productName: string
}

export default function BreadCrumb({ productName }: BreadCrumbProps) {
  return (
    <div className="container mx-auto px-4 py-4">
      <nav className="text-sm text-gray-500">
        <a href="/" className="hover:text-black transition-colors">Trang chủ</a>
        <span className="mx-2">/</span>
        <a href="/vest-blazer" className="hover:text-black transition-colors">Vest & Blazer</a>
        <span className="mx-2">/</span>
        <span className="text-black">{productName}</span>
      </nav>
    </div>
  )
}
