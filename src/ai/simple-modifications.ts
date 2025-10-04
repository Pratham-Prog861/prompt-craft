// Simple HTML modifications for follow-up prompts without AI
export function getSimpleModification(
  currentHtml: string,
  prompt: string
): string {
  const lowerPrompt = prompt.toLowerCase();

  // Color changes
  if (lowerPrompt.includes("color") || lowerPrompt.includes("theme")) {
    if (lowerPrompt.includes("red")) {
      return currentHtml
        .replace(/bg-blue-/g, "bg-red-")
        .replace(/text-blue-/g, "text-red-")
        .replace(/border-blue-/g, "border-red-")
        .replace(/from-blue-/g, "from-red-")
        .replace(/to-purple-/g, "to-pink-");
    }
    if (lowerPrompt.includes("green")) {
      return currentHtml
        .replace(/bg-blue-/g, "bg-green-")
        .replace(/text-blue-/g, "text-green-")
        .replace(/border-blue-/g, "border-green-")
        .replace(/from-blue-/g, "from-green-")
        .replace(/to-purple-/g, "to-emerald-");
    }
    if (lowerPrompt.includes("dark")) {
      return currentHtml
        .replace(/bg-white/g, "bg-gray-900")
        .replace(/bg-gray-50/g, "bg-gray-800")
        .replace(/text-gray-900/g, "text-white")
        .replace(/text-gray-600/g, "text-gray-300")
        .replace(/text-gray-700/g, "text-gray-200");
    }
  }

  // Add sections
  if (lowerPrompt.includes("add") || lowerPrompt.includes("include")) {
    if (lowerPrompt.includes("newsletter") || lowerPrompt.includes("signup")) {
      const newsletterSection = `
  <!-- Newsletter Section -->
  <section class="py-20 bg-blue-600 text-white">
    <div class="max-w-4xl mx-auto text-center px-4">
      <h3 class="text-3xl font-bold mb-4">Stay Updated</h3>
      <p class="text-xl mb-8 text-blue-100">Get the latest updates and exclusive content delivered to your inbox</p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
        <input type="email" placeholder="Enter your email" class="px-4 py-3 rounded-lg text-gray-900 flex-1">
        <button class="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50">Subscribe</button>
      </div>
    </div>
  </section>`;

      return currentHtml.replace(
        "</div>\n</div>",
        `</div>\n</div>\n${newsletterSection}`
      );
    }

    if (lowerPrompt.includes("pricing") || lowerPrompt.includes("plan")) {
      const pricingSection = `
  <!-- Pricing Section -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4">
      <h3 class="text-3xl font-bold text-center mb-16 text-gray-900">Choose Your Plan</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-8 rounded-xl shadow-lg text-center">
          <h4 class="text-xl font-semibold mb-4">Basic</h4>
          <div class="text-3xl font-bold text-blue-600 mb-6">$9<span class="text-lg text-gray-600">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="text-gray-600">✓ Basic features</li>
            <li class="text-gray-600">✓ Email support</li>
            <li class="text-gray-600">✓ 1 user</li>
          </ul>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Get Started</button>
        </div>
        <div class="bg-white p-8 rounded-xl shadow-lg text-center border-2 border-blue-600">
          <h4 class="text-xl font-semibold mb-4">Pro</h4>
          <div class="text-3xl font-bold text-blue-600 mb-6">$29<span class="text-lg text-gray-600">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="text-gray-600">✓ All Basic features</li>
            <li class="text-gray-600">✓ Priority support</li>
            <li class="text-gray-600">✓ 5 users</li>
          </ul>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Get Started</button>
        </div>
        <div class="bg-white p-8 rounded-xl shadow-lg text-center">
          <h4 class="text-xl font-semibold mb-4">Enterprise</h4>
          <div class="text-3xl font-bold text-blue-600 mb-6">$99<span class="text-lg text-gray-600">/month</span></div>
          <ul class="space-y-3 mb-8">
            <li class="text-gray-600">✓ All Pro features</li>
            <li class="text-gray-600">✓ 24/7 support</li>
            <li class="text-gray-600">✓ Unlimited users</li>
          </ul>
          <button class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Contact Sales</button>
        </div>
      </div>
    </div>
  </section>`;

      return currentHtml.replace(
        "</div>\n</div>",
        `</div>\n</div>\n${pricingSection}`
      );
    }

    if (lowerPrompt.includes("contact") || lowerPrompt.includes("form")) {
      const contactSection = `
  <!-- Contact Section -->
  <section class="py-20 bg-white">
    <div class="max-w-4xl mx-auto px-4">
      <h3 class="text-3xl font-bold text-center mb-16 text-gray-900">Get In Touch</h3>
      <div class="grid md:grid-cols-2 gap-12">
        <div>
          <h4 class="text-xl font-semibold mb-6">Contact Information</h4>
          <div class="space-y-4">
            <div class="flex items-center">
              <div class="w-6 h-6 text-blue-600 mr-3">📧</div>
              <span>hello@example.com</span>
            </div>
            <div class="flex items-center">
              <div class="w-6 h-6 text-blue-600 mr-3">📞</div>
              <span>+1 (555) 123-4567</span>
            </div>
            <div class="flex items-center">
              <div class="w-6 h-6 text-blue-600 mr-3">📍</div>
              <span>123 Business St, City, State 12345</span>
            </div>
          </div>
        </div>
        <div>
          <form class="space-y-4">
            <input type="text" placeholder="Your Name" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
            <input type="email" placeholder="Your Email" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent">
            <textarea placeholder="Your Message" rows="4" class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"></textarea>
            <button type="submit" class="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  </section>`;

      return currentHtml.replace(
        "</div>\n</div>",
        `</div>\n</div>\n${contactSection}`
      );
    }
  }

  // Text changes
  if (lowerPrompt.includes("change") && lowerPrompt.includes("title")) {
    if (lowerPrompt.includes("to ")) {
      const newTitle =
        prompt.split("to ")[1]?.split(".")[0]?.trim() || "New Title";
      return currentHtml.replace(
        /<h1[^>]*>.*?<\/h1>/i,
        `<h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">${newTitle}</h1>`
      );
    }
  }

  // Layout changes
  if (lowerPrompt.includes("center") || lowerPrompt.includes("middle")) {
    return currentHtml
      .replace(/text-left/g, "text-center")
      .replace(/justify-start/g, "justify-center");
  }

  if (lowerPrompt.includes("bigger") || lowerPrompt.includes("larger")) {
    return currentHtml
      .replace(/text-4xl/g, "text-5xl")
      .replace(/text-3xl/g, "text-4xl")
      .replace(/text-2xl/g, "text-3xl")
      .replace(/text-xl/g, "text-2xl");
  }

  if (lowerPrompt.includes("smaller")) {
    return currentHtml
      .replace(/text-5xl/g, "text-4xl")
      .replace(/text-4xl/g, "text-3xl")
      .replace(/text-3xl/g, "text-2xl")
      .replace(/text-2xl/g, "text-xl");
  }

  // If no specific modification found, add a generic improvement
  const improvements = [
    // Add some animation classes
    currentHtml.replace(
      /class="([^"]*btn[^"]*)"/,
      'class="$1 transform hover:scale-105 transition-transform"'
    ),
    // Add some shadow improvements
    currentHtml.replace(
      /shadow-lg/g,
      "shadow-xl hover:shadow-2xl transition-shadow"
    ),
    // Add some spacing improvements
    currentHtml.replace(/py-20/g, "py-24"),
  ];

  return (
    improvements[Math.floor(Math.random() * improvements.length)] || currentHtml
  );
}
