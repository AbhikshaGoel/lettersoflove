export const PAGE_DATA_QUERY = `
  query GetPageData {
    # 1. Fetch posts (This part was correct)
    posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
      nodes {
        id
        title
        slug
        excerpt
        date
        author {
          node {
            name
            nickname
          }
        }
        featuredImage {
          node {
            sourceUrl
            altText
          }
        }
        categories {
          nodes {
            name
            slug
          }
        }
      }
    }
    
    # 2. FIXED: Categories Query
    # 'orderby' expects an Enum (COUNT), not an object.
    # We move 'order: DESC' to the sibling argument.
    categories(first: 5, where: { hideEmpty: true, orderby: COUNT, order: DESC }) {
      nodes {
        id
        name
        slug
        count
      }
    }
  }
`;

export const GET_POST_BY_SLUG = `
  query GetPostBySlug($slug: ID!) {
    post(id: $slug, idType: SLUG) {
      id
      title
      content
      date
      excerpt
      author {
        node {
          name
          nickname
          avatar {
            url
          }
        }
      }
      categories {
        nodes {
          name
          slug
        }
      }
      featuredImage {
        node {
          sourceUrl
          altText
        }
      }
    }
  }
`;

export const GET_ALL_SLUGS = `
  query GetAllSlugs {
    posts(first: 20) {
      nodes {
        slug
      }
    }
  }
`;

export const GET_CATEGORY_DATA = `
  query GetCategoryData($slug: ID!) {
    category(id: $slug, idType: SLUG) {
      id
      name
      description
      count
      posts(first: 20, where: { orderby: { field: DATE, order: DESC } }) {
        nodes {
          id
          title
          slug
          excerpt
          date
          featuredImage {
            node {
              sourceUrl
              altText
            }
          }
          categories {
            nodes {
              name
              slug
            }
          }
        }
      }
    }
  }
`;

export const GET_ALL_CATEGORIES_SLUGS = `
  query GetAllCategories {
    categories(first: 100) {
      nodes {
        slug
      }
    }
  }
`;
