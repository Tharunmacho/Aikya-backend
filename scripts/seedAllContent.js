import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { 
  Hero, 
  About, 
  WhyChoose, 
  Contact, 
  Leadership, 
  Projects,
  Testimonials,
  SpecialOffers,
  Services,
  News,
  CSR,
  Events,
  Careers,
  GroupCompany,
  Partnership,
  Footer
} from '../models/Content.js';

dotenv.config();

const seedAllContent = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Clear existing content
    await Hero.deleteMany({});
    await About.deleteMany({});
    await WhyChoose.deleteMany({});
    await Contact.deleteMany({});
    await Leadership.deleteMany({});
    await Testimonials.deleteMany({});
    await SpecialOffers.deleteMany({});
    await Services.deleteMany({});
    await News.deleteMany({});
    await CSR.deleteMany({});
    await Events.deleteMany({});
    await Careers.deleteMany({});
    await GroupCompany.deleteMany({});
    await Partnership.deleteMany({});
    await Footer.deleteMany({});
    console.log('Cleared existing content');

    // Seed Hero Section
    await Hero.create({
      title: 'Building Dreams, Creating Futures',
      subtitle: 'Aikya Builds Future',
      tagline: 'Excellence in Real Estate & Construction',
      buttonText: 'Explore Projects',
      buttonLink: '/projects'
    });
    console.log('Hero section seeded');

    // Seed About Section
    await About.create({
      heading: 'About Aikya Builds Future',
      content: 'Aikya Builders Pvt. Ltd. is a trusted real estate and construction company committed to delivering quality homes and commercial spaces. With a vision to create sustainable living environments, we combine innovation, integrity, and craftsmanship in every project. Our mission is to build not just structures, but vibrant communities where families thrive.'
    });
    console.log('About section seeded');

    // Seed Why Choose Section
    await WhyChoose.create({
      heading: 'Why Choose Aikya Builders?',
      reasons: [
        {
          icon: 'Award',
          title: 'Quality Assurance',
          description: 'Every project adheres to the highest standards of quality and craftsmanship.'
        },
        {
          icon: 'Clock',
          title: 'Timely Delivery',
          description: 'We value your time and ensure projects are completed on schedule.'
        },
        {
          icon: 'Shield',
          title: 'Trusted Partner',
          description: 'Decades of experience and thousands of satisfied customers.'
        },
        {
          icon: 'Leaf',
          title: 'Sustainable Design',
          description: 'Environmentally conscious construction with green building practices.'
        }
      ]
    });
    console.log('Why Choose section seeded');

    // Seed Contact Section
    await Contact.create({
      heading: 'Get In Touch',
      description: 'Have questions or need guidance? Our team is always ready to assist you with personalized support and expert advice.',
      email: 'enquiry@aikyabuilders.com',
      phone: '+91 9042 666 555',
      address: 'No.247/B, Velachery Main Road, Selaiyur, Chennai, Tamil Nadu 600073, India'
    });
    console.log('Contact section seeded');

    // Seed Leadership Section
    await Leadership.create({
      heading: 'Meet Our Leadership',
      leaders: [
        {
          name: 'Rajesh Kumar',
          role: 'Chairman & Managing Director',
          bio: 'Visionary leader with over 30 years of experience in real estate development.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.16 PM (1).jpeg'
        },
        {
          name: 'Priya Sharma',
          role: 'Chief Operations Officer',
          bio: 'Expert in project management and sustainable construction practices.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.16 PM (2).jpeg'
        },
        {
          name: 'Arun Patel',
          role: 'Chief Financial Officer',
          bio: 'Strategic financial planning expert ensuring project viability and growth.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.16 PM (3).jpeg'
        }
      ]
    });
    console.log('Leadership section seeded');

    // Seed Testimonials Section
    await Testimonials.create({
      heading: 'What Our Clients Say',
      subheading: 'we create spaces that transform lives and possibilities',
      description: 'Our clients are at the heart of everything we do.',
      testimonials: [
        {
          name: 'Ramesh Iyer',
          role: 'Homeowner',
          company: 'Aikya Eden Park Resident',
          content: 'The quality of construction and attention to detail is exceptional. We are proud homeowners at Aikya Eden Park.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.21 PM (1).jpeg',
          rating: 5
        },
        {
          name: 'Lakshmi Venkat',
          role: 'Business Owner',
          company: 'Warehouse Client',
          content: 'Their warehouse development exceeded our expectations. Professional team and timely delivery.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.21 PM (2).jpeg',
          rating: 5
        },
        {
          name: 'Suresh Reddy',
          role: 'Investor',
          company: 'Channel Partner',
          content: 'Partnering with Aikya has been a rewarding experience. Transparent and trustworthy.',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.21 PM (3).jpeg',
          rating: 5
        }
      ]
    });
    console.log('Testimonials section seeded');

    // Seed Special Offers Section
    await SpecialOffers.create({
      heading: 'Special Offers',
      subheading: 'Limited Time Opportunities',
      offers: [
        {
          title: 'Aikya Eden Park',
          description: 'Premium 2 & 3 BHK apartments in a serene location',
          price: 'Starting ₹45 Lakhs',
          discount: 'Early Bird Discount Available',
          features: [
            '2 & 3 BHK Spacious Apartments',
            '286 Premium Units',
            'Modern Amenities',
            'Prime Location in Guduvanchery',
            'DTCP Approved'
          ],
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.12 PM.jpeg',
          location: 'Guduvanchery, Chennai',
          status: 'Available',
          contactPhone: '+91 9042 666 555',
          contactEmail: 'enquiry@aikyabuilders.com',
          validTill: new Date('2026-12-31')
        }
      ]
    });
    console.log('Special Offers section seeded');

    // Seed Services Section
    await Services.create({
      heading: 'Our Services',
      subheading: 'Comprehensive Infrastructure Solutions',
      description: 'Aikya Builds Future offers comprehensive infrastructure and construction solutions that transform communities and drive economic growth. Our expertise spans across highway construction, warehouse development, and integrated township projects.',
      services: [
        {
          title: 'Highway Construction',
          description: 'We specialize in designing and constructing world-class highways that connect communities and facilitate seamless transportation. Our commitment to quality and safety ensures that every road we build stands the test of time.',
          features: [
            {
              title: 'Safety First:',
              description: 'We adhere to the highest safety standards, ensuring secure roads for travelers.'
            },
            {
              title: 'Durability Guaranteed:',
              description: 'Using premium materials, our highways are built to last.'
            },
            {
              title: 'Efficient Designs:',
              description: 'Thoughtfully planned routes to minimize congestion and optimize travel times.'
            }
          ],
          icon: 'Truck',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.17 PM.jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.17 PM (1).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.17 PM (2).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.18 PM.jpeg'
          ],
          category: 'Infrastructure'
        },
        {
          title: 'Warehouse Development',
          description: 'Our warehouses are built to meet the demands of modern logistics, offering scalable solutions for businesses of all sizes. We create intelligent storage spaces that maximize efficiency and minimize operational costs.',
          features: [
            {
              title: 'Scalable Designs:',
              description: 'Flexible layouts to adapt to growing business needs.'
            },
            {
              title: 'Strategic Locations:',
              description: 'Warehouses positioned for easy access to key transport networks.'
            },
            {
              title: 'Energy Efficiency:',
              description: 'Built with sustainable materials and technologies to reduce energy consumption.'
            }
          ],
          icon: 'Warehouse',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.18 PM (1).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.18 PM (2).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.18 PM (3).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.19 PM.jpeg'
          ],
          category: 'Commercial'
        },
        {
          title: 'Integrated Township Development',
          description: 'We create self-sustained townships that offer a perfect blend of residential, commercial, and recreational spaces. Our townships are designed to provide residents with everything they need for a comfortable and fulfilling lifestyle.',
          features: [
            {
              title: 'Sustainable Designs:',
              description: 'Eco-friendly architecture and green initiatives.'
            },
            {
              title: 'Recreational Amenities:',
              description: 'Parks, sports facilities, and community centers for a holistic lifestyle.'
            },
            {
              title: 'Smart City Infrastructure::',
              description: 'Advanced technology for efficient and connected living.'
            }
          ],
          icon: 'Building',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.19 PM (1).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.19 PM (2).jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.20 PM.jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.20 PM (1).jpeg'
          ],
          category: 'Township'
        }
      ]
    });
    console.log('Services section seeded');

    // Seed News Section
    await News.create({
      heading: 'Latest News',
      description: 'Stay updated with our latest announcements and developments',
      articles: [
        {
          title: 'Aikya Eden Park Launched',
          excerpt: 'New premium residential project in Guduvanchery',
          content: 'We are excited to announce the launch of Aikya Eden Park, featuring 286 premium units...',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.12 PM.jpeg',
          author: 'Aikya Team',
          publishedDate: new Date('2026-02-15'),
          category: 'Project Launch',
          tags: ['residential', 'new launch', 'chennai']
        }
      ]
    });
    console.log('News section seeded');

    // Seed CSR Section
    await CSR.create({
      heading: 'Corporate Social Responsibility',
      description: 'Building communities, transforming lives',
      whyWeCare: {
        heading: 'Why We Care',
        content: 'At Aikya Builders, we believe in giving back to the community. Our CSR initiatives focus on education, healthcare, and environmental sustainability.'
      },
      initiatives: [
        {
          title: 'Education for All',
          description: 'Supporting underprivileged children with scholarships and educational resources',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.20 PM (2).jpeg',
          category: 'Education',
          impact: '500+ students supported'
        },
        {
          title: 'Green Building Initiative',
          description: 'Promoting sustainable construction practices and environmental conservation',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.21 PM.jpeg',
          category: 'Environment',
          impact: '100% projects with green features'
        }
      ]
    });
    console.log('CSR section seeded');

    // Seed Events Section
    await Events.create({
      heading: 'Upcoming Events',
      description: 'Join us at our upcoming events and property showcases',
      events: [
        {
          title: 'Aikya Eden Park Open House',
          description: 'Visit our sample flats and explore the amenities',
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.23 PM.jpeg',
          date: new Date('2026-03-15'),
          location: 'Guduvanchery, Chennai',
          category: 'Property Showcase',
          registrationLink: '/contact'
        }
      ]
    });
    console.log('Events section seeded');

    // Seed Careers Section
    await Careers.create({
      heading: 'Join Our Team',
      description: 'Be part of a team that builds the future',
      whyJoinUs: {
        heading: 'Why Work With Us?',
        points: [
          'Competitive compensation',
          'Growth opportunities',
          'Collaborative environment',
          'Work-life balance'
        ]
      },
      openings: []
    });
    console.log('Careers section seeded');

    // Seed Group Company Section
    await GroupCompany.create({
      heading: 'Our Extended Vision',
      description: 'Explore our child companies, dedicated to innovation and excellence, shaping a brighter future.',
      companies: [
        {
          name: 'Aikya Builders & Promoters',
          fullName: 'Aikya Builders & Promoters Pvt. Ltd.',
          description: [
            'Established in the year 2006, Aikya Builders & Promoters is one of the most trusted and reputed builders in Chennai.',
            'Catering to a wide array of home segments ranging from compact homes to plush villas, well-developed plots to commercial complexes.',
            'The Company adheres to ISO 9001:2008 standards.',
            'Delivering superior quality homes on-time every time.'
          ],
          logo: '',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.13 PM.jpeg',
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.13 PM (1).jpeg'
          ],
          establishedYear: 2006,
          category: 'Real Estate'
        },
        {
          name: 'ARMC',
          fullName: 'Aikya Ready-Mix Concrete',
          description: [
            'Formed in 2013, Aikya Ready-Mix Concrete (ARMC) is an ISO 9001:2015 firm manufacturing high tech concrete.',
            'Fully computerized state-of-the-art modern plant and machinery comprising of two units of Batching Plant.',
            'With our large fleet of modern Transit Mixers and Concrete Pumps, we provide timely delivery of high tech RMC.'
          ],
          logo: '',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.13 PM (2).jpeg'
          ],
          establishedYear: 2013,
          category: 'Manufacturing'
        },
        {
          name: 'Aikya Sportz India',
          fullName: 'Aikya Sportz India Pvt. Ltd.',
          description: [
            'Incorporated in the year 2006, Aikya Sportz India Pvt. Ltd. was started to actively encourage sports in the state of Tamilnadu.',
            'We own Aikya Warriors franchise, which represents the town of Tiruchirappalli in the Tamil Nadu Premier League.'
          ],
          logo: '',
          images: [
            '/assets/images/WhatsApp Image 2026-02-26 at 7.15.14 PM.jpeg'
          ],
          establishedYear: 2006,
          category: 'Sports'
        }
      ],
      partnershipInfo: {
        heading: 'Why Partner With Aikya?',
        description: [
          'With years of proven expertise and a portfolio of landmark projects, we have built a reputation for trust, innovation, and excellence.',
          'By partnering with us, you gain access to a network of resources, expertise, and opportunities that drive growth.'
        ]
      }
    });
    console.log('Group Company section seeded');

    // Seed Partnership Section
    await Partnership.create({
      heading: 'Partner With Us',
      description: 'Join hands with Aikya Builders to create exceptional opportunities',
      whyPartner: {
        heading: 'Why Partner With Us?',
        reasons: [
          'Proven track record of successful projects',
          'Transparent business practices',
          'Mutual growth and success',
          'Access to resources and expertise'
        ]
      },
      categories: [
        {
          title: 'Channel Partners',
          description: 'Join as a channel partner and leverage our reputation and resources to expand your network, boost your credibility, and achieve unparalleled growth in the industry.',
          benefits: [
            'Attractive commission structure',
            'Marketing support',
            'Dedicated relationship manager',
            'Training and development'
          ],
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.22 PM.jpeg',
          icon: 'Handshake'
        },
        {
          title: 'Landowners',
          description: 'Transform your land into a valuable asset with our innovative and sustainable development projects.',
          benefits: [
            'Fair land valuation',
            'Joint development options',
            'Transparent agreements',
            'Professional project execution'
          ],
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.22 PM (1).jpeg',
          icon: 'MapPin'
        },
        {
          title: 'Investors',
          description: 'Become a part of projects that deliver high returns and meaningful impact.',
          benefits: [
            'High ROI opportunities',
            'Diversified portfolio options',
            'Regular project updates',
            'Risk mitigation strategies'
          ],
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.22 PM (2).jpeg',
          icon: 'TrendingUp'
        },
        {
          title: 'Vendors',
          description: 'We value partnerships with quality vendors who help us deliver excellence.',
          benefits: [
            'Timely payments',
            'Long-term contracts',
            'Fair pricing',
            'Growth opportunities'
          ],
          image: '/assets/images/WhatsApp Image 2026-02-26 at 7.15.14 PM (1).jpeg',
          icon: 'Package'
        }
      ]
    });
    console.log('Partnership section seeded');

    // Seed Footer Section
    await Footer.create({
      companyName: 'Aikya Builders and Promoters',
      tagline: 'Building Future',
      address: 'No.247/B, Velachery Main Road, Selaiyur, Chennai, Tamil Nadu 600073, India',
      phone: ['+91 9042 666 555', '+91 44 6009 6009'],
      email: 'enquiry@aikyabuilders.com',
      socialMedia: [
        { platform: 'Instagram', url: '#', icon: 'Instagram' },
        { platform: 'Facebook', url: '#', icon: 'Facebook' },
        { platform: 'LinkedIn', url: '#', icon: 'Linkedin' },
        { platform: 'Twitter', url: '#', icon: 'Twitter' },
        { platform: 'YouTube', url: '#', icon: 'Youtube' }
      ],
      links: {
        company: [
          { label: 'Home', href: '/' },
          { label: 'About Us', href: '#about' },
          { label: 'Contact Us', href: '#contact' },
          { label: 'Special Offers', href: '#offers' },
          { label: 'Group of Company', href: '/group-of-company' },
          { label: 'Partner with Us', href: '/partner-with-us' }
        ],
        resources: [
          { label: 'News', href: '/news' },
          { label: 'Events', href: '/events' },
          { label: 'CSR', href: '/csr' },
          { label: 'Careers', href: '/careers' }
        ]
      },
      copyright: '© Aikya Builders and Promoters - Designed and Developed by Knowbin Technologies',
      developedBy: 'Knowbin Technologies'
    });
    console.log('Footer section seeded');

    console.log('\n✅ All content seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding content:', error);
    process.exit(1);
  }
};

seedAllContent();
