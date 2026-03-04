import mongoose from 'mongoose';
import {
  ServiceItem,
  CSRItem,
  EventItem,
  CareerItem,
} from '../models/CMSItems.js';
import dotenv from 'dotenv';

dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

// Sample Services Data
const servicesData = [
  {
    title: 'Highway Construction & Infrastructure',
    description: 'We specialize in the construction of high-quality highways, roads, and infrastructure projects. Our expertise includes widening existing roads, building new highways, and creating durable infrastructure that connects communities.',
    category: 'Infrastructure',
    icon: 'Highway',
    image: 'https://images.unsplash.com/photo-1600585152915-d208bec867a1?w=800',
    features: [
      { title: 'National Highway Construction', description: 'Building and maintaining national highway networks' },
      { title: 'State Highway Development', description: 'Developing state-level road infrastructure' },
      { title: 'Road Widening Projects', description: 'Expanding existing roads to improve traffic flow' },
      { title: 'Bridge & Flyover Construction', description: 'Building modern bridges and flyovers' },
      { title: 'Advanced Paving Technologies', description: 'Using latest road construction techniques' }
    ],
  },
  {
    title: 'Warehouse Development & Logistics',
    description: 'Design and construction of modern warehouses and logistics centers equipped with state-of-the-art facilities. Our warehouses are built to optimize supply chain operations with advanced technology and efficient layouts.',
    category: 'Commercial',
    icon: 'Warehouse',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?w=800',
    features: [
      { title: 'Grade A Warehouse Construction', description: 'Premium quality warehouse facilities' },
      { title: 'Temperature-Controlled Facilities', description: 'Climate-controlled storage solutions' },
      { title: 'Automated Storage Systems', description: 'Modern automated warehouse management' },
      { title: 'Loading Bay Optimization', description: 'Efficient loading and unloading infrastructure' },
      { title: 'LEED Certified Buildings', description: 'Environmentally sustainable construction' }
    ],
  },
  {
    title: 'Integrated Township Projects',
    description: 'Complete residential township development with world-class amenities. We create sustainable communities with modern infrastructure, green spaces, and all essential facilities for comfortable living.',
    category: 'Residential',
    icon: 'Building2',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800',
    features: [
      { title: 'Master-Planned Communities', description: 'Thoughtfully designed residential layouts' },
      { title: 'Smart City Infrastructure', description: 'Modern technology-enabled facilities' },
      { title: 'Parks & Recreation', description: 'Green spaces and recreational amenities' },
      { title: 'Educational & Healthcare', description: 'Schools and medical facilities within township' },
      { title: 'Sustainable Water Management', description: 'Eco-friendly water conservation systems' }
    ],
  },
  {
    title: 'Industrial & Manufacturing Facilities',
    description: 'Construction of industrial facilities including manufacturing plants, processing units, and industrial parks. Our projects are designed for operational efficiency and compliance with industry standards.',
    category: 'Industrial',
    icon: 'Factory',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112c4e5190?w=800',
    features: [
      { title: 'Manufacturing Plant Construction', description: 'Complete industrial plant setup' },
      { title: 'Industrial Park Development', description: 'Large-scale industrial zone creation' },
      { title: 'Process Infrastructure', description: 'Specialized industrial process systems' },
      { title: 'Utility Systems Installation', description: 'Power, water, and utility setup' },
      { title: 'Environmental Compliance', description: 'Meeting all regulatory standards' }
    ],
  },
];

// Sample CSR Initiatives Data
const csrData = [
  {
    title: 'Education Support Programs',
    description: 'We are committed to transforming education in rural areas by providing infrastructure, learning resources, and scholarships to underprivileged children. Our initiative has benefited over 5,000 students across 50+ schools.',
    category: 'Education',
    image: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    impact: 'Supported 5,000+ students across 50 schools',
    date: '2024-01-15',
    location: 'Various locations across Telangana',
    isActive: true,
  },
  {
    title: 'Healthcare & Medical Camps',
    description: 'Regular health check-up camps and medical assistance programs in underserved communities. We provide free medical consultations, medicines, and health awareness programs.',
    category: 'Healthcare',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
    impact: '10,000+ people benefited through medical camps',
    date: '2024-02-20',
    location: 'Rural areas of Andhra Pradesh and Telangana',
    isActive: true,
  },
  {
    title: 'Environmental Sustainability',
    description: 'Tree plantation drives, waste management initiatives, and promotion of renewable energy. Our green initiatives have resulted in planting over 25,000 trees and implementing sustainable practices across our project sites.',
    category: 'Environment',
    image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800',
    impact: '25,000+ trees planted and sustainable practices implemented',
    date: '2023-11-10',
    location: 'Project sites across South India',
    isActive: true,
  },
  {
    title: 'Skill Development & Employment',
    description: 'Vocational training programs for youth to enhance their employability in construction and related sectors. We have trained over 2,000 individuals in various technical skills.',
    category: 'Employment',
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800',
    impact: '2,000+ youth trained in construction and technical skills',
    date: '2024-03-05',
    location: 'Training centers in Hyderabad and Visakhapatnam',
    isActive: true,
  },
  {
    title: 'Community Infrastructure Development',
    description: 'Building community centers, water supply systems, and sanitation facilities in rural villages. Improving quality of life through basic infrastructure development.',
    category: 'Infrastructure',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800',
    impact: '30+ villages provided with basic infrastructure',
    date: '2023-09-18',
    location: 'Rural villages in Telangana',
    isActive: true,
  },
];

// Sample Events Data
const eventsData = [
  {
    title: 'Annual Customer Appreciation Meet 2024',
    description: 'Join us for our annual customer appreciation event where we celebrate partnerships, discuss future projects, and network with industry leaders. Experience showcases of our completed projects and upcoming developments.',
    date: '2024-06-15',
    time: '10:00 AM - 4:00 PM',
    location: 'ITC Kohenur, Hyderabad',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
    status: 'upcoming',
    registrationLink: '#',
    capacity: 500,
    isActive: true,
  },
  {
    title: 'NH-44 Highway Expansion Groundbreaking',
    description: 'Official groundbreaking ceremony for the 80km highway expansion project. A landmark infrastructure development connecting major cities with improved connectivity.',
    date: '2024-05-10',
    time: '11:00 AM',
    location: 'Project Site, NH-44 Corridor',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800',
    status: 'upcoming',
    registrationLink: '#',
    isActive: true,
  },
  {
    title: 'Sustainability in Construction Summit',
    description: 'Industry summit focusing on green building practices, sustainable materials, and environmental responsibility in large-scale construction projects. Features expert speakers and panel discussions.',
    date: '2024-07-20',
    time: '9:00 AM - 5:00 PM',
    location: 'Radisson Blu, Bangalore',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
    status: 'upcoming',
    registrationLink: '#',
    capacity: 300,
    isActive: true,
  },
  {
    title: 'Aikya Township Phase 2 Launch',
    description: 'Grand launch event for Phase 2 of our flagship integrated township project. Experience the model homes, amenities showcase, and exclusive launch offers for early investors.',
    date: '2024-04-28',
    time: '10:00 AM - 6:00 PM',
    location: 'Aikya Township, Outer Ring Road',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800',
    status: 'completed',
    isActive: true,
  },
];

// Sample Careers Data
const careersData = [
  {
    title: 'Senior Project Manager - Highway Construction',
    description: 'Lead and manage large-scale highway construction projects from planning to completion. Oversee project teams, ensure quality standards, manage budgets, and coordinate with stakeholders.',
    department: 'Project Management',
    location: 'Hyderabad, Telangana',
    type: 'full-time',
    experience: '8-12 years',
    requirements: [
      'Bachelor\'s degree in Civil Engineering',
      'Minimum 8 years in highway/infrastructure projects',
      'PMP certification preferred',
      'Strong knowledge of construction standards and regulations',
      'Excellent leadership and communication skills',
    ],
    responsibilities: [
      'Manage end-to-end project delivery',
      'Lead project teams and contractors',
      'Ensure compliance with quality and safety standards',
      'Budget management and cost control',
      'Stakeholder coordination and reporting',
    ],
    applyLink: '#',
    status: 'open',
  },
  {
    title: 'Civil Site Engineer',
    description: 'Oversee day-to-day construction activities at project sites. Ensure quality execution, safety compliance, and timely completion of project milestones.',
    department: 'Engineering',
    location: 'Visakhapatnam, Andhra Pradesh',
    type: 'full-time',
    experience: '3-5 years',
    requirements: [
      'Bachelor\'s degree in Civil Engineering',
      '3-5 years experience in construction projects',
      'Knowledge of AutoCAD and project management software',
      'Understanding of construction methodologies',
      'Strong problem-solving abilities',
    ],
    responsibilities: [
      'Supervise construction activities daily',
      'Quality checks and inspections',
      'Coordinate with contractors and vendors',
      'Maintain project documentation',
      'Ensure safety compliance on site',
    ],
    applyLink: '#',
    status: 'open',
  },
  {
    title: 'Business Development Manager',
    description: 'Drive business growth by identifying new opportunities, building client relationships, and securing new projects. Focus on developing strategic partnerships in the infrastructure sector.',
    department: 'Sales & Marketing',
    location: 'Bangalore, Karnataka',
    type: 'full-time',
    experience: '5-8 years',
    requirements: [
      'MBA or equivalent degree',
      'Proven track record in B2B sales (construction/infrastructure)',
      'Strong network in infrastructure sector',
      'Excellent negotiation and presentation skills',
      'Strategic thinking and analytical abilities',
    ],
    responsibilities: [
      'Identify and pursue new business opportunities',
      'Build and maintain client relationships',
      'Prepare proposals and presentations',
      'Achieve sales targets and growth objectives',
      'Market research and competitive analysis',
    ],
    applyLink: '#',
    status: 'open',
  },
  {
    title: 'Safety Officer',
    description: 'Ensure workplace safety and compliance with health and safety regulations across construction sites. Implement safety programs and conduct regular audits.',
    department: 'HSE',
    location: 'Multiple Locations',
    type: 'full-time',
    experience: '4-6 years',
    requirements: [
      'Degree in Occupational Health & Safety or related field',
      'Safety certification (NEBOSH/IOSH preferred)',
      '4+ years in construction safety management',
      'Knowledge of safety regulations and standards',
      'Strong communication and training skills',
    ],
    responsibilities: [
      'Develop and implement safety programs',
      'Conduct safety audits and inspections',
      'Incident investigation and reporting',
      'Safety training for workers and staff',
      'Ensure regulatory compliance',
    ],
    applyLink: '#',
    status: 'open',
  },
];

async function populateData() {
  try {
    console.log('Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB successfully!');

    // Clear existing data
    console.log('\n🗑️  Clearing existing data...');
    await ServiceItem.deleteMany({});
    await CSRItem.deleteMany({});
    await EventItem.deleteMany({});
    await CareerItem.deleteMany({});
    console.log('Existing data cleared.');

    // Insert Services
    console.log('\n📦 Inserting Services...');
    const services = await ServiceItem.insertMany(servicesData);
    console.log(`✅ ${services.length} services inserted`);
    services.forEach((service, index) => {
      console.log(`   ${index + 1}. ${service.title} (${service.category})`);
    });

    // Insert CSR Initiatives
    console.log('\n🌱 Inserting CSR Initiatives...');
    const initiatives = await CSRItem.insertMany(csrData);
    console.log(`✅ ${initiatives.length} CSR initiatives inserted`);
    initiatives.forEach((initiative, index) => {
      console.log(`   ${index + 1}. ${initiative.title} (${initiative.category})`);
    });

    // Insert Events
    console.log('\n📅 Inserting Events...');
    const events = await EventItem.insertMany(eventsData);
    console.log(`✅ ${events.length} events inserted`);
    events.forEach((event, index) => {
      console.log(`   ${index + 1}. ${event.title} - ${event.date} (${event.status})`);
    });

    // Insert Career Positions
    console.log('\n💼 Inserting Career Positions...');
    const careers = await CareerItem.insertMany(careersData);
    console.log(`✅ ${careers.length} career positions inserted`);
    careers.forEach((career, index) => {
      console.log(`   ${index + 1}. ${career.title} - ${career.location} (${career.type})`);
    });

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✨ DATA POPULATION COMPLETED SUCCESSFULLY! ✨');
    console.log('='.repeat(60));
    console.log(`Total items inserted: ${services.length + initiatives.length + events.length + careers.length}`);
    console.log(`   - Services: ${services.length}`);
    console.log(`   - CSR Initiatives: ${initiatives.length}`);
    console.log(`   - Events: ${events.length}`);
    console.log(`   - Career Positions: ${careers.length}`);
    console.log('='.repeat(60));

  } catch (error) {
    console.error('❌ Error populating data:', error);
    throw error;
  } finally {
    await mongoose.connection.close();
    console.log('\n🔌 Database connection closed.');
  }
}

// Run the script
populateData();
