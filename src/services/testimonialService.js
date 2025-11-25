const Testimonial = require('../models/Testimonial');

class TestimonialService {
  async getAllTestimonials() {
    return await Testimonial.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
  }

  async getTestimonialById(id) {
    const testimonial = await Testimonial.findById(id);
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    return testimonial;
  }

  async createTestimonial(data) {
    return await Testimonial.create(data);
  }

  async updateTestimonial(id, data) {
    const testimonial = await Testimonial.findByIdAndUpdate(
      id,
      data,
      { new: true, runValidators: true }
    );
    
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    
    return testimonial;
  }

  async deleteTestimonial(id) {
    const testimonial = await Testimonial.findByIdAndDelete(id);
    
    if (!testimonial) {
      throw new Error('Testimonial not found');
    }
    
    return testimonial;
  }
}

module.exports = new TestimonialService();