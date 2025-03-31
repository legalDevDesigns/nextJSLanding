'use client';

import { siteConfig } from '../siteConfig';
import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const formBody = new URLSearchParams({
        'form-name': 'contact',
        ...formData
      }).toString();
      
      console.log('Submitting form with data:', formBody);
      
      const response = await fetch('/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody
      });

      console.log('Response status:', response.status);
      
      if (response.ok) {
        setFormData({
          name: '',
          email: '',
          phone: '',
          message: '',
        });
        alert('Thank you for your message! We will get back to you soon.');
      } else {
        const responseText = await response.text();
        console.error('Form submission error:', responseText);
        throw new Error('Form submission failed. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('There was an error submitting your message. Please try again.');
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Hidden form for Netlify */}
      <form name="contact" netlify netlify-honeypot="bot-field" hidden>
        <input type="text" name="name" />
        <input type="email" name="email" />
        <input type="tel" name="phone" />
        <textarea name="message"></textarea>
      </form>

      {/* Top Bar */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white py-2 px-4">
        <div className="container mx-auto flex justify-between items-center">
          <span className="font-bold">{siteConfig.business.name}</span>
          <a href={`tel:${siteConfig.business.phone}`} className="hover:text-blue-200">
            {siteConfig.business.phone}
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <Image
            src={siteConfig.hero.backgroundImage}
            alt="Hero background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 z-10 text-center text-white">
          <h1 className="text-5xl font-bold mb-4">{siteConfig.hero.title}</h1>
          <p className="text-xl mb-8">{siteConfig.hero.subtitle}</p>
          <form 
            name="contact"
            method="POST"
            netlify="true"
            netlify-honeypot="bot-field"
            onSubmit={handleSubmit}
            className="max-w-md mx-auto bg-white/10 backdrop-blur-sm p-8 rounded-lg"
          >
            <input type="hidden" name="form-name" value="contact" />
            <p hidden>
              <label>
                Don't fill this out if you're human: <input name="bot-field" />
              </label>
            </p>
            <h2 className="text-2xl font-semibold mb-6 text-white">{siteConfig.hero.formTitle}</h2>
            <div className="space-y-4">
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Your Name"
                required
                className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="Your Email"
                required
                className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="Your Phone"
                required
                className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Your Message"
                required
                rows="4"
                className="w-full px-4 py-2 rounded bg-white/20 border border-white/30 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full mt-6 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Send Message
            </button>
          </form>
        </div>
      </section>

      {/* Feature Cards */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.features.main.map((feature, index) => (
              <div key={index} className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="relative h-[400px] rounded-lg overflow-hidden">
              <Image
                src={siteConfig.about.image}
                alt="About Us"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-4">{siteConfig.about.title}</h2>
              <p className="text-gray-600">{siteConfig.about.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {siteConfig.testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-center mb-4">
                  <div className="relative h-16 w-16 mr-4 rounded-full overflow-hidden">
                    <Image
                      src={testimonial.avatar}
                      alt={testimonial.author}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-bold">{testimonial.author}</p>
                    <p className="text-gray-500">{testimonial.position}</p>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.quote}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Block */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={siteConfig.cta.primary.backgroundImage}
            alt="CTA Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-blue-600 bg-opacity-90"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-4">{siteConfig.cta.primary.title}</h2>
          <p className="mb-8">{siteConfig.cta.primary.subtitle}</p>
          <button
            onClick={scrollToTop}
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors duration-300"
          >
            {siteConfig.cta.primary.buttonText}
          </button>
        </div>
      </section>

      {/* Secondary Feature Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {siteConfig.features.secondary.map((feature, index) => (
              <div key={index} className="group bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300">
                <div className="relative h-48 mb-4 rounded overflow-hidden">
                  <Image
                    src={feature.image}
                    alt={feature.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Parallax CTA */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={siteConfig.cta.secondary.backgroundImage}
            alt="Parallax Background"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 text-white">
          <h2 className="text-3xl font-bold mb-4">{siteConfig.cta.secondary.title}</h2>
          <p className="mb-8">{siteConfig.cta.secondary.subtitle}</p>
          <button
            onClick={scrollToTop}
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition-colors duration-300"
          >
            {siteConfig.cta.secondary.buttonText}
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h2 className="text-3xl font-bold mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <p>
                  <strong>Phone:</strong> {siteConfig.business.phone}
                </p>
                <p>
                  <strong>Address:</strong> {siteConfig.business.address}
                </p>
              </div>
              <button
                onClick={scrollToTop}
                className="mt-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300"
              >
                Contact Us
              </button>
            </div>
            <div className="h-64 rounded-lg overflow-hidden shadow-lg">
              <iframe
                src={siteConfig.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-blue-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-xl font-bold mb-4">{siteConfig.business.name}</h3>
          <p className="mb-2">{siteConfig.business.phone}</p>
          <p>{siteConfig.business.email}</p>
        </div>
      </footer>
    </main>
  );
} 