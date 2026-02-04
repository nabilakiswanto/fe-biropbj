interface PageHeaderProps {
  title: string
  description?: string
  category?:string
}

export default function PageHeader({ title, description,category }: PageHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <h1 className="text-3xl md:text-4xl font-bold text-primary mb-4">{title}</h1>
      {/* {description && <p className="text-lg text-muted-foreground max-w-2xl mx-auto">{description}</p>} */}
      {category && (
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Publikasi / {category.charAt(0).toUpperCase() + category.slice(1)}
        </p>
      )}

    </div>
  )
}

