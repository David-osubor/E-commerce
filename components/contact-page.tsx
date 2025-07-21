"use client";

import type React from "react";

import { useState } from "react";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Format the message for WhatsApp
      const message = encodeURIComponent(
        `New Contact Form Submission\n\nName: ${formData.name}\nEmail: ${formData.email}\nSubject: ${formData.subject}\n\nMessage: ${formData.message}`
      );

      // Create WhatsApp URL (replace with your admin number)
      const whatsappUrl = `https://wa.me/2349072738022?text=${message}`;

      // Open WhatsApp in a new tab
      window.open(whatsappUrl, "_blank");

      // Show success message
      toast(
        "Message sent successfully! We'll respond to your inquiry as soon as possible."
      );

      // Reset form
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
        console.log(error)
      toast("Error sending message, Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-blue-600 px-4 py-16">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-white text-4xl md:text-5xl font-bold mb-4">
            Get in Touch
          </h1>
          <p className="text-white/90 text-lg">
            Have questions? We&apos;d love to hear from you. Send us a message,
            use our live chat support, or email us and we&apos;ll respond as
            soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="px-4 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <Phone className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Phone</h3>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>+234 907 273 8022</p>
              </div>
              <div className="mt-4">
                <a
                  href="tel:++2349072738022"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Contact →
                </a>
              </div>
            </div>

            {/* Email Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <Mail className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Email</h3>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>digimart@gmail.com</p>
              </div>
              <div className="mt-4">
                <a
                  href="mailto:digimart@gmail.com"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Contact →
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <MapPin className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Location</h3>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>OOU Ibogun Campus, Ifo</p>
                <p>Ogun State, Nigeria</p>
              </div>
              <div className="mt-4">
                <a
                  href="https://maps.google.com/?q=Lagos,Nigeria"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Location →
                </a>
              </div>
            </div>

            {/* Hours Card */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                  <Clock className="w-5 h-5 text-gray-500" />
                </div>
                <h3 className="font-semibold text-gray-900">Hours</h3>
              </div>
              <div className="space-y-2 text-gray-600 text-sm">
                <p>Monday-Friday: 8:00am - 7:00pm</p>
                <p>Saturday: 9:00am - 5:00pm</p>
              </div>
              <div className="mt-4">
                <a
                  href="#"
                  className="text-blue-600 hover:underline text-sm font-medium"
                >
                  Contact →
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form and Map */}
      <section className="px-4 py-12">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <div className="bg-gray-100 rounded-lg p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">
                Send us a Message
              </h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Name
                  </label>
                  <Input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Your Name"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="email@gmail.com"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) =>
                      handleInputChange("subject", e.target.value)
                    }
                    placeholder="Your Subject"
                    required
                    className="w-full"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message
                  </label>
                  <Textarea
                    id="message"
                    value={formData.message}
                    onChange={(e) =>
                      handleInputChange("message", e.target.value)
                    }
                    placeholder="Your Message"
                    required
                    className="w-full min-h-[120px]"
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </div>

            {/* Map */}
            <div className="bg-gray-200 rounded-lg overflow-hidden h-[500px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.46312651278!2d3.1191195!3d6.5244031!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos%2C%20Nigeria!5e0!3m2!1sen!2sus!4v1658824681276!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="DigiMart Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
