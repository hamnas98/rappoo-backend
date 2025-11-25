const FAQ = require('../models/FAQ');

class FAQService {
  async getAllFAQs() {
    return await FAQ.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  }

  async getFAQById(id) {
    const faq = await FAQ.findById(id);
    if (!faq) {
      throw new Error('FAQ not found');
    }
    return faq;
  }

  async createFAQ(data) {
    return await FAQ.create(data);
  }

  async updateFAQ(id, data) {
    const faq = await FAQ.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!faq) {
      throw new Error('FAQ not found');
    }
    
    return faq;
  }

  async deleteFAQ(id) {
    const faq = await FAQ.findByIdAndDelete(id);
    
    if (!faq) {
      throw new Error('FAQ not found');
    }
    
    return faq;
  }
}

module.exports = new FAQService();