export const SEO_KEYWORDS = () => {
  const primaryKeywords = [  ]

  const secondaryKeywords = [  ]

  const brandKeywords = [  ]

  const getAllKeywords = () => [...primaryKeywords, ...secondaryKeywords, ...brandKeywords]

  return {
    primaryKeywords,
    secondaryKeywords, 
    brandKeywords,
    getAllKeywords
  }
}