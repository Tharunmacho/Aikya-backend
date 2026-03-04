import mongoose from 'mongoose';
import { NewsArticle } from '../models/CMSItems.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Sample News Articles Data
const newsArticles = [
  {
    title: 'Aikya Builds Future Completes Major Highway Project Ahead of Schedule',
    excerpt: 'The 80km NH-44 expansion project has been successfully completed 2 months ahead of the original deadline, setting new standards in infrastructure development.',
    content: `
      <p>We are proud to announce the successful completion of the NH-44 highway expansion project, a major milestone in our journey of excellence in infrastructure development.</p>
      
      <p>The project, spanning 80 kilometers, involved widening existing roads, constructing new bridges, and implementing advanced traffic management systems. Despite challenging weather conditions and complex terrain, our dedicated team completed the project 2 months ahead of schedule.</p>
      
      <p>Key Highlights:</p>
      <ul>
        <li>80km of highway expansion completed</li>
        <li>3 major bridges and 5 flyovers constructed</li>
        <li>Advanced LED lighting system installed</li>
        <li>Smart traffic management integration</li>
        <li>100% compliance with environmental regulations</li>
      </ul>
      
      <p>This achievement reflects our commitment to timely delivery and quality construction. The project will significantly improve connectivity between major cities and boost economic growth in the region.</p>
    `,
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800',
    author: 'Rajesh Kumar',
    category: 'Infrastructure',
    tags: ['Highway', 'Infrastructure', 'NH-44', 'Project Completion'],
    status: 'published',
    publishedDate: new Date('2024-02-15'),
  },
  {
    title: 'New Grade A Warehouse Complex Inaugurated in Hyderabad',
    excerpt: 'Our latest warehouse development project in Hyderabad features state-of-the-art facilities and sets new benchmarks in logistics infrastructure.',
    content: `
      <p>Aikya Builds Future has successfully completed and inaugurated a new Grade A warehouse complex in Hyderabad, marking another milestone in our commercial development portfolio.</p>
      
      <p>The facility spans 200,000 square feet and is equipped with modern amenities including:</p>
      <ul>
        <li>Climate-controlled storage zones</li>
        <li>Automated inventory management system</li>
        <li>24/7 security and surveillance</li>
        <li>Wide loading docks with hydraulic systems</li>
        <li>LEED Gold certification for sustainability</li>
      </ul>
      
      <p>The warehouse has already been leased to leading logistics companies and is expected to create over 500 employment opportunities in the region.</p>
    `,
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    author: 'Priya Sharma',
    category: 'Commercial',
    tags: ['Warehouse', 'Logistics', 'Hyderabad', 'Commercial'],
    status: 'published',
    publishedDate: new Date('2024-02-01'),
  },
  {
    title: 'Aikya Township Phase 2: Building Communities, Transforming Lives',
    excerpt: 'Phase 2 of our flagship integrated township project is now open for bookings, offering world-class amenities and modern living spaces.',
    content: `
      <p>We are excited to announce the launch of Phase 2 of Aikya Township, our flagship integrated residential development project.</p>
      
      <p>Building on the overwhelming success of Phase 1, Phase 2 offers:</p>
      <ul>
        <li>500+ premium apartments and villas</li>
        <li>20 acres of green spaces and parks</li>
        <li>International school and medical center</li>
        <li>Sports complex with swimming pool</li>
        <li>Shopping arcade and community center</li>
        <li>Smart home automation</li>
        <li>24/7 power backup and water supply</li>
      </ul>
      
      <p>Phase 2 embodies our vision of creating sustainable communities where residents enjoy modern amenities while staying connected to nature.</p>
    `,
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    author: 'Vikram Reddy',
    category: 'Residential',
    tags: ['Township', 'Residential', 'Real Estate', 'Phase Launch'],
    status: 'published',
    publishedDate: new Date('2024-01-20'),
  },
  {
    title: 'Sustainability Award: Aikya Recognized for Green Building Initiatives',
    excerpt: 'Our commitment to sustainable construction has been recognized with the prestigious Green Building Excellence Award 2024.',
    content: `
      <p>Aikya Builds Future has been honored with the Green Building Excellence Award 2024 for our outstanding commitment to sustainable construction practices.</p>
      
      <p>The award recognizes our comprehensive efforts in:</p>
      <ul>
        <li>Implementing LEED certification across all projects</li>
        <li>Using eco-friendly and recycled materials</li>
        <li>Solar power integration in residential and commercial projects</li>
        <li>Rainwater harvesting and water recycling systems</li>
        <li>Reducing construction waste by 40%</li>
      </ul>
      
      <p>This achievement reinforces our dedication to environmental responsibility and sets an example for the industry.</p>
    `,
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    author: 'Meera Patel',
    category: 'Awards',
    tags: ['Sustainability', 'Awards', 'Green Building', 'CSR'],
    status: 'published',
    publishedDate: new Date('2024-01-10'),
  },
  {
    title: 'Community Outreach: 5,000 Students Benefit from Educational Support Program',
    excerpt: 'Our CSR initiative continues to make a difference in rural education, providing resources and infrastructure to underprivileged schools.',
    content: `
      <p>As part of our Corporate Social Responsibility initiatives, Aikya Builds Future has successfully supported over 5,000 students across 50 schools in rural Telangana and Andhra Pradesh.</p>
      
      <p>Our educational support program includes:</p>
      <ul>
        <li>Building new classrooms and computer labs</li>
        <li>Providing learning materials and textbooks</li>
        <li>Scholarships for deserving students</li>
        <li>Teacher training programs</li>
        <li>Digital literacy initiatives</li>
      </ul>
      
      <p>Education is the foundation of progress, and we are committed to ensuring every child has access to quality learning opportunities.</p>
    `,
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    author: 'Anand Kumar',
    category: 'CSR',
    tags: ['CSR', 'Education', 'Community', 'Social Impact'],
    status: 'published',
    publishedDate: new Date('2023-12-15'),
  },
  {
    title: 'Upcoming: Construction Technology Summit 2024',
    excerpt: 'Join us at the Construction Technology Summit where industry leaders will discuss innovation, sustainability, and the future of infrastructure.',
    content: `
      <p>Aikya Builds Future is proud to host the Construction Technology Summit 2024, bringing together industry leaders, innovators, and experts to discuss the future of construction and infrastructure development.</p>
      
      <p>Summit Highlights:</p>
      <ul>
        <li>Keynote speeches from industry veterans</li>
        <li>Panel discussions on sustainable construction</li>
        <li>Technology demonstrations and exhibitions</li>
        <li>Networking opportunities</li>
        <li>Workshop sessions on modern construction techniques</li>
      </ul>
      
      <p>Date: March 15-16, 2024<br>
      Venue: Hyderabad International Convention Centre<br>
      Registration: Open to industry professionals</p>
    `,
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    author: 'Suresh Babu',
    category: 'Events',
    tags: ['Events', 'Technology', 'Summit', 'Industry'],
    status: 'published',
    publishedDate: new Date('2024-02-28'),
  },
];

async function populateNewsArticles() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing news articles
    console.log('\n🗑️  Clearing existing news articles...');
    await NewsArticle.deleteMany({});
    console.log('Existing news articles cleared.');

    // Insert News Articles
    console.log('\n📰 Inserting News Articles...');
    const articles = await NewsArticle.insertMany(newsArticles);
    console.log(`✅ ${articles.length} news articles inserted`);
    
    articles.forEach((article, index) => {
      const date = new Date(article.publishedDate).toLocaleDateString();
      console.log(`   ${index + 1}. ${article.title.substring(0, 60)}... (${article.category}, ${date})`);
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ NEWS ARTICLES POPULATION COMPLETED! ✨');
    console.log('='.repeat(60));
    console.log(`Total news articles inserted: ${articles.length}`);
    console.log(`   - Published: ${articles.filter(a => a.status === 'published').length}`);
    console.log(`   - Draft: ${articles.filter(a => a.status === 'draft').length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error populating news articles:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the script
populateNewsArticles();
