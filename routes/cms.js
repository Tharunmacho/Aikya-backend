import express from 'express';
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
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Middleware to verify admin access
const verifyAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ 
        success: false, 
        message: 'Access denied. No token provided.' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: 'Invalid token' 
      });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ 
        success: false, 
        message: 'Access denied. Admin privileges required.' 
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ 
      success: false, 
      message: 'Invalid token' 
    });
  }
};

// ===== HERO SECTION =====

// Get hero content
router.get('/hero', async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = await Hero.create({});
    }
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Update hero content
router.put('/hero', verifyAdmin, async (req, res) => {
  try {
    let hero = await Hero.findOne();
    if (!hero) {
      hero = new Hero();
    }
    
    Object.assign(hero, req.body);
    hero.updatedAt = Date.now();
    await hero.save();
    
    res.json({ success: true, data: hero, message: 'Hero section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== ABOUT SECTION =====

router.get('/about', async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = await About.create({});
    }
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/about', verifyAdmin, async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) {
      about = new About();
    }
    
    Object.assign(about, req.body);
    about.updatedAt = Date.now();
    await about.save();
    
    res.json({ success: true, data: about, message: 'About section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== WHY CHOOSE SECTION =====

router.get('/why-choose', async (req, res) => {
  try {
    let whyChoose = await WhyChoose.findOne();
    if (!whyChoose) {
      whyChoose = await WhyChoose.create({});
    }
    res.json({ success: true, data: whyChoose });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/why-choose', verifyAdmin, async (req, res) => {
  try {
    let whyChoose = await WhyChoose.findOne();
    if (!whyChoose) {
      whyChoose = new WhyChoose();
    }
    
    Object.assign(whyChoose, req.body);
    whyChoose.updatedAt = Date.now();
    await whyChoose.save();
    
    res.json({ success: true, data: whyChoose, message: 'Why Choose section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== CONTACT SECTION =====

router.get('/contact', async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = await Contact.create({});
    }
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/contact', verifyAdmin, async (req, res) => {
  try {
    let contact = await Contact.findOne();
    if (!contact) {
      contact = new Contact();
    }
    
    Object.assign(contact, req.body);
    contact.updatedAt = Date.now();
    await contact.save();
    
    res.json({ success: true, data: contact, message: 'Contact section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== LEADERSHIP SECTION =====

router.get('/leadership', async (req, res) => {
  try {
    let leadership = await Leadership.findOne();
    if (!leadership) {
      leadership = await Leadership.create({});
    }
    res.json({ success: true, data: leadership });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/leadership', verifyAdmin, async (req, res) => {
  try {
    let leadership = await Leadership.findOne();
    if (!leadership) {
      leadership = new Leadership();
    }
    
    Object.assign(leadership, req.body);
    leadership.updatedAt = Date.now();
    await leadership.save();
    
    res.json({ success: true, data: leadership, message: 'Leadership section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== PROJECTS SECTION =====

router.get('/projects', async (req, res) => {
  try {
    let projects = await Projects.findOne();
    if (!projects) {
      projects = await Projects.create({});
    }
    res.json({ success: true, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/projects', verifyAdmin, async (req, res) => {
  try {
    let projects = await Projects.findOne();
    if (!projects) {
      projects = new Projects();
    }
    
    Object.assign(projects, req.body);
    projects.updatedAt = Date.now();
    await projects.save();
    
    res.json({ success: true, data: projects, message: 'Projects section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== TESTIMONIALS SECTION =====

router.get('/testimonials', async (req, res) => {
  try {
    let testimonials = await Testimonials.findOne();
    if (!testimonials) {
      testimonials = await Testimonials.create({});
    }
    res.json({ success: true, data: testimonials });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/testimonials', verifyAdmin, async (req, res) => {
  try {
    let testimonials = await Testimonials.findOne();
    if (!testimonials) {
      testimonials = new Testimonials();
    }
    
    Object.assign(testimonials, req.body);
    testimonials.updatedAt = Date.now();
    await testimonials.save();
    
    res.json({ success: true, data: testimonials, message: 'Testimonials section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== SPECIAL OFFERS SECTION =====

router.get('/special-offers', async (req, res) => {
  try {
    let specialOffers = await SpecialOffers.findOne();
    if (!specialOffers) {
      specialOffers = await SpecialOffers.create({});
    }
    res.json({ success: true, data: specialOffers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/special-offers', verifyAdmin, async (req, res) => {
  try {
    let specialOffers = await SpecialOffers.findOne();
    if (!specialOffers) {
      specialOffers = new SpecialOffers();
    }
    
    Object.assign(specialOffers, req.body);
    specialOffers.updatedAt = Date.now();
    await specialOffers.save();
    
    res.json({ success: true, data: specialOffers, message: 'Special Offers section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== SERVICES SECTION =====

router.get('/services', async (req, res) => {
  try {
    let services = await Services.findOne();
    if (!services) {
      services = await Services.create({});
    }
    res.json({ success: true, data: services });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/services', verifyAdmin, async (req, res) => {
  try {
    let services = await Services.findOne();
    if (!services) {
      services = new Services();
    }
    
    Object.assign(services, req.body);
    services.updatedAt = Date.now();
    await services.save();
    
    res.json({ success: true, data: services, message: 'Services section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== NEWS SECTION =====

router.get('/news', async (req, res) => {
  try {
    let news = await News.findOne();
    if (!news) {
      news = await News.create({});
    }
    res.json({ success: true, data: news });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/news', verifyAdmin, async (req, res) => {
  try {
    let news = await News.findOne();
    if (!news) {
      news = new News();
    }
    
    Object.assign(news, req.body);
    news.updatedAt = Date.now();
    await news.save();
    
    res.json({ success: true, data: news, message: 'News section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== CSR SECTION =====

router.get('/csr', async (req, res) => {
  try {
    let csr = await CSR.findOne();
    if (!csr) {
      csr = await CSR.create({});
    }
    res.json({ success: true, data: csr });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/csr', verifyAdmin, async (req, res) => {
  try {
    let csr = await CSR.findOne();
    if (!csr) {
      csr = new CSR();
    }
    
    Object.assign(csr, req.body);
    csr.updatedAt = Date.now();
    await csr.save();
    
    res.json({ success: true, data: csr, message: 'CSR section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== EVENTS SECTION =====

router.get('/events', async (req, res) => {
  try {
    let events = await Events.findOne();
    if (!events) {
      events = await Events.create({});
    }
    res.json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/events', verifyAdmin, async (req, res) => {
  try {
    let events = await Events.findOne();
    if (!events) {
      events = new Events();
    }
    
    Object.assign(events, req.body);
    events.updatedAt = Date.now();
    await events.save();
    
    res.json({ success: true, data: events, message: 'Events section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== CAREERS SECTION =====

router.get('/careers', async (req, res) => {
  try {
    let careers = await Careers.findOne();
    if (!careers) {
      careers = await Careers.create({});
    }
    res.json({ success: true, data: careers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/careers', verifyAdmin, async (req, res) => {
  try {
    let careers = await Careers.findOne();
    if (!careers) {
      careers = new Careers();
    }
    
    Object.assign(careers, req.body);
    careers.updatedAt = Date.now();
    await careers.save();
    
    res.json({ success: true, data: careers, message: 'Careers section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== GROUP OF COMPANY SECTION =====

router.get('/group-company', async (req, res) => {
  try {
    let groupCompany = await GroupCompany.findOne();
    if (!groupCompany) {
      groupCompany = await GroupCompany.create({});
    }
    res.json({ success: true, data: groupCompany });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/group-company', verifyAdmin, async (req, res) => {
  try {
    let groupCompany = await GroupCompany.findOne();
    if (!groupCompany) {
      groupCompany = new GroupCompany();
    }
    
    Object.assign(groupCompany, req.body);
    groupCompany.updatedAt = Date.now();
    await groupCompany.save();
    
    res.json({ success: true, data: groupCompany, message: 'Group Company section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== PARTNERSHIP SECTION =====

router.get('/partnership', async (req, res) => {
  try {
    let partnership = await Partnership.findOne();
    if (!partnership) {
      partnership = await Partnership.create({});
    }
    res.json({ success: true, data: partnership });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/partnership', verifyAdmin, async (req, res) => {
  try {
    let partnership = await Partnership.findOne();
    if (!partnership) {
      partnership = new Partnership();
    }
    
    Object.assign(partnership, req.body);
    partnership.updatedAt = Date.now();
    await partnership.save();
    
    res.json({ success: true, data: partnership, message: 'Partnership section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ===== FOOTER SECTION =====

router.get('/footer', async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = await Footer.create({});
    }
    res.json({ success: true, data: footer });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

router.put('/footer', verifyAdmin, async (req, res) => {
  try {
    let footer = await Footer.findOne();
    if (!footer) {
      footer = new Footer();
    }
    
    Object.assign(footer, req.body);
    footer.updatedAt = Date.now();
    await footer.save();
    
    res.json({ success: true, data: footer, message: 'Footer section updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

export default router;
