// Client-side post storage using localStorage
export class PostStorage {
  constructor() {
    this.storageKey = 'alaome-blog-posts';
    this.initializeDefaultPosts();
  }

  // Initialize with default posts if none exist
  initializeDefaultPosts() {
    const existingPosts = this.getAllPosts();
    if (existingPosts.length === 0) {
      const defaultPosts = [
        {
          id: 1,
          title: "Empowering Communities Through Education",
          excerpt: "Discover how our education programs are transforming lives in underserved communities, providing hope and opportunities for a brighter future.",
          content: `<p>Education is the foundation of transformation. In our work across underserved communities, we've witnessed firsthand how access to quality education can break cycles of poverty and create pathways to brighter futures.</p>

<h2>The Challenge</h2>
<p>Many communities lack access to basic educational resources. Children walk miles to reach the nearest school, often lacking textbooks, supplies, and even qualified teachers. This educational gap perpetuates cycles of poverty and limits opportunities for entire generations.</p>

<h2>Our Approach</h2>
<p>We believe in sustainable, community-driven solutions. Our education programs focus on:</p>
<ul>
  <li>Building and renovating schools in remote areas</li>
  <li>Training and supporting local teachers</li>
  <li>Providing educational materials and technology</li>
  <li>Creating scholarship programs for promising students</li>
  <li>Engaging parents and community leaders</li>
</ul>

<h2>Impact Stories</h2>
<p>Take Maria, a 12-year-old from a rural village who couldn't read when we first met her. Through our literacy program, she not only learned to read but became the top student in her class. Today, she dreams of becoming a teacher to help other children in her community.</p>`,
          image: "https://images.pexels.com/photos/8112198/pexels-photo-8112198.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
          date: "December 15, 2024",
          author: "Sarah Johnson",
          slug: "empowering-communities-education",
          category: "Education",
          status: "published",
          views: 1250,
          featured: true,
          createdAt: new Date().toISOString()
        },
        {
          id: 2,
          title: "Building Hope Through Healthcare Initiatives",
          excerpt: "Learn about our mobile healthcare clinics bringing essential medical services to remote areas, saving lives and building healthier communities.",
          content: `<p>Healthcare is a fundamental human right, yet millions of people in remote and underserved communities lack access to basic medical services. Our mobile healthcare initiatives are changing this reality, one community at a time.</p>

<h2>The Healthcare Crisis</h2>
<p>In many rural areas, the nearest hospital or clinic can be hours away. Pregnant women give birth without medical assistance, children suffer from preventable diseases, and chronic conditions go untreated.</p>

<h2>Mobile Healthcare Solutions</h2>
<p>Our mobile healthcare clinics bring essential medical services directly to communities that need them most:</p>
<ul>
  <li>Regular health screenings and preventive care</li>
  <li>Maternal and child health services</li>
  <li>Vaccination programs</li>
  <li>Treatment for common illnesses and injuries</li>
  <li>Health education and awareness programs</li>
</ul>`,
          image: "https://images.pexels.com/photos/6975474/pexels-photo-6975474.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
          date: "December 10, 2024",
          author: "Dr. Michael Chen",
          slug: "building-hope-healthcare",
          category: "Healthcare",
          status: "published",
          views: 890,
          featured: false,
          createdAt: new Date().toISOString()
        },
        {
          id: 3,
          title: "Sustainable Development: Creating Lasting Change",
          excerpt: "Explore our sustainable development projects that are creating long-term positive impact in communities around the world.",
          content: `<p>True transformation requires sustainable solutions that communities can maintain long after we leave. Our sustainable development projects focus on building local capacity and creating lasting positive change.</p>

<h2>Beyond Quick Fixes</h2>
<p>While emergency aid is important, sustainable development addresses root causes of poverty and inequality. We work with communities to identify their needs and develop solutions they can own and maintain.</p>`,
          image: "https://images.pexels.com/photos/6646844/pexels-photo-6646844.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop",
          date: "December 5, 2024",
          author: "Emma Rodriguez",
          slug: "sustainable-development-change",
          category: "Development",
          status: "draft",
          views: 0,
          featured: false,
          createdAt: new Date().toISOString()
        }
      ];
      
      this.savePosts(defaultPosts);
    }
  }

  // Get all posts from localStorage
  getAllPosts() {
    try {
      const posts = localStorage.getItem(this.storageKey);
      return posts ? JSON.parse(posts) : [];
    } catch (error) {
      console.error('Error loading posts:', error);
      return [];
    }
  }

  // Get published posts only
  getPublishedPosts() {
    return this.getAllPosts().filter(post => post.status === 'published');
  }

  // Get post by slug
  getPostBySlug(slug) {
    return this.getAllPosts().find(post => post.slug === slug);
  }

  // Get post by ID
  getPostById(id) {
    return this.getAllPosts().find(post => post.id === parseInt(id));
  }

  // Save posts to localStorage
  savePosts(posts) {
    try {
      localStorage.setItem(this.storageKey, JSON.stringify(posts));
      return true;
    } catch (error) {
      console.error('Error saving posts:', error);
      return false;
    }
  }

  // Add new post
  addPost(postData) {
    const posts = this.getAllPosts();
    const newId = Math.max(...posts.map(p => p.id), 0) + 1;
    
    // Generate slug from title if not provided
    const slug = postData.slug || this.generateSlug(postData.title);
    
    const newPost = {
      id: newId,
      ...postData,
      slug,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    posts.unshift(newPost); // Add to beginning
    return this.savePosts(posts) ? newPost : null;
  }

  // Update post
  updatePost(id, postData) {
    const posts = this.getAllPosts();
    const index = posts.findIndex(post => post.id === parseInt(id));
    
    if (index === -1) return false;
    
    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString()
    };
    
    return this.savePosts(posts);
  }

  // Delete post
  deletePost(id) {
    const posts = this.getAllPosts();
    const filteredPosts = posts.filter(post => post.id !== parseInt(id));
    return this.savePosts(filteredPosts);
  }

  // Generate URL-friendly slug
  generateSlug(title) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }

  // Get posts by category
  getPostsByCategory(category) {
    const posts = this.getPublishedPosts();
    return category === 'all' ? posts : posts.filter(post => 
      post.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search posts
  searchPosts(query) {
    const posts = this.getPublishedPosts();
    const searchTerm = query.toLowerCase();
    
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.author.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm)
    );
  }

  // Get stats
  getStats() {
    const posts = this.getAllPosts();
    return {
      total: posts.length,
      published: posts.filter(p => p.status === 'published').length,
      drafts: posts.filter(p => p.status === 'draft').length,
      totalViews: posts.reduce((sum, p) => sum + (p.views || 0), 0)
    };
  }
}

// Create singleton instance
export const postStorage = new PostStorage();