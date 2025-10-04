// Fallback HTML templates for when AI is slow or fails
export const fallbackTemplates = {
  landing: `
<div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
  <div class="max-w-4xl mx-auto text-center">
    <h1 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
      Welcome to Your Website
    </h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
      This is a beautiful, responsive website created just for you. 
      You can customize every aspect of it with simple prompts.
    </p>
    <div class="flex flex-col sm:flex-row gap-4 justify-center">
      <button class="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
        Get Started
      </button>
      <button class="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
        Learn More
      </button>
    </div>
  </div>
</div>`,

  business: `
<div class="min-h-screen bg-white">
  <header class="bg-gray-900 text-white p-6">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold">Your Business</h1>
      <nav class="hidden md:flex space-x-6">
        <a href="#" class="hover:text-gray-300">Home</a>
        <a href="#" class="hover:text-gray-300">About</a>
        <a href="#" class="hover:text-gray-300">Services</a>
        <a href="#" class="hover:text-gray-300">Contact</a>
      </nav>
    </div>
  </header>
  
  <main class="max-w-6xl mx-auto p-6">
    <section class="text-center py-20">
      <h2 class="text-5xl font-bold text-gray-900 mb-6">
        Professional Services
      </h2>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        We provide exceptional services to help your business grow and succeed in today's competitive market.
      </p>
      <button class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
        Contact Us Today
      </button>
    </section>
  </main>
</div>`,

  portfolio: `
<div class="min-h-screen bg-gray-50">
  <header class="bg-white shadow-sm p-6">
    <div class="max-w-4xl mx-auto flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Your Portfolio</h1>
      <nav class="flex space-x-6">
        <a href="#" class="text-gray-600 hover:text-gray-900">Work</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
      </nav>
    </div>
  </header>
  
  <main class="max-w-4xl mx-auto p-6">
    <section class="text-center py-16">
      <h2 class="text-4xl font-bold text-gray-900 mb-4">
        Creative Professional
      </h2>
      <p class="text-lg text-gray-600 mb-8">
        Showcasing my best work and creative projects
      </p>
    </section>
    
    <section class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <h3 class="text-xl font-semibold mb-2">Project One</h3>
        <p class="text-gray-600">Description of your amazing project</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <h3 class="text-xl font-semibold mb-2">Project Two</h3>
        <p class="text-gray-600">Description of your amazing project</p>
      </div>
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="bg-gray-200 h-48 rounded-lg mb-4"></div>
        <h3 class="text-xl font-semibold mb-2">Project Three</h3>
        <p class="text-gray-600">Description of your amazing project</p>
      </div>
    </section>
  </main>
</div>`,
};

// AI Learning Hub template for your specific prompt
const aiLearningHubTemplate = `
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <!-- Hero Section -->
  <header class="relative overflow-hidden bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <div class="absolute inset-0 bg-black opacity-10"></div>
    <div class="relative max-w-7xl mx-auto px-4 py-20 sm:px-6 lg:px-8">
      <div class="text-center">
        <h1 class="text-4xl md:text-6xl font-bold mb-6">
          AI-Powered Learning Hub
        </h1>
        <p class="text-xl md:text-2xl mb-8 text-blue-100">
          Transform your skills with personalized AI-driven education
        </p>
        <button class="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
          Get Started Free
        </button>
      </div>
    </div>
  </header>

  <!-- Features Section -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-16 text-gray-900">Why Choose Our Platform</h2>
      <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Structured Learning Paths</h3>
          <p class="text-gray-600">Follow curated learning journeys designed by experts</p>
        </div>
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">AI Recommendations</h3>
          <p class="text-gray-600">Get personalized course suggestions based on your goals</p>
        </div>
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Free Resources</h3>
          <p class="text-gray-600">Access thousands of free courses and materials</p>
        </div>
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-orange-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-2">Expert Support</h3>
          <p class="text-gray-600">Get help from industry professionals</p>
        </div>
      </div>
    </div>
  </section>

  <!-- How It Works -->
  <section class="py-20 bg-gray-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-20 h-20 bg-blue-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">1</div>
          <h3 class="text-xl font-semibold mb-4">Discover</h3>
          <p class="text-gray-600">Explore our vast library of courses and find what interests you most</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-purple-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">2</div>
          <h3 class="text-xl font-semibold mb-4">Learn</h3>
          <p class="text-gray-600">Follow structured paths with AI-powered recommendations tailored to you</p>
        </div>
        <div class="text-center">
          <div class="w-20 h-20 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">3</div>
          <h3 class="text-xl font-semibold mb-4">Apply</h3>
          <p class="text-gray-600">Put your new skills to work with real-world projects and challenges</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Testimonials -->
  <section class="py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl font-bold text-center mb-16 text-gray-900">What Our Learners Say</h2>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">JS</div>
            <div class="ml-4">
              <h4 class="font-semibold">John Smith</h4>
              <p class="text-gray-600 text-sm">Software Developer</p>
            </div>
          </div>
          <p class="text-gray-700">"The AI recommendations helped me discover skills I never knew I needed. Amazing platform!"</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">MJ</div>
            <div class="ml-4">
              <h4 class="font-semibold">Maria Johnson</h4>
              <p class="text-gray-600 text-sm">Data Scientist</p>
            </div>
          </div>
          <p class="text-gray-700">"Structured learning paths made complex topics easy to understand. Highly recommend!"</p>
        </div>
        <div class="bg-white p-6 rounded-xl shadow-lg">
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">AL</div>
            <div class="ml-4">
              <h4 class="font-semibold">Alex Lee</h4>
              <p class="text-gray-600 text-sm">Product Manager</p>
            </div>
          </div>
          <p class="text-gray-700">"Free resources are top-notch quality. This platform changed my career trajectory!"</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Final CTA -->
  <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
    <div class="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
      <h2 class="text-3xl md:text-4xl font-bold mb-6">
        Start Learning Today – It's Free!
      </h2>
      <p class="text-xl mb-8 text-blue-100">
        Join thousands of learners who are already transforming their careers with AI-powered education
      </p>
      <button class="bg-white text-blue-600 px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-50 transition-all shadow-lg">
        Get Started Free
      </button>
    </div>
  </section>
</div>`;

export function getFallbackTemplate(prompt: string): string {
  const lowerPrompt = prompt.toLowerCase();

  // AI Learning Hub specific template
  if (
    lowerPrompt.includes("learning") ||
    lowerPrompt.includes("ai") ||
    lowerPrompt.includes("education") ||
    lowerPrompt.includes("hub")
  ) {
    return aiLearningHubTemplate;
  }

  // Always return a good fallback template instantly
  if (
    lowerPrompt.includes("business") ||
    lowerPrompt.includes("company") ||
    lowerPrompt.includes("corporate")
  ) {
    return fallbackTemplates.business;
  } else if (
    lowerPrompt.includes("portfolio") ||
    lowerPrompt.includes("showcase") ||
    lowerPrompt.includes("work")
  ) {
    return fallbackTemplates.portfolio;
  } else {
    // Enhanced landing template for better results
    return `
<div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
  <header class="bg-white shadow-sm">
    <div class="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-900">Your Website</h1>
      <nav class="flex space-x-6">
        <a href="#" class="text-gray-600 hover:text-gray-900">Home</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">About</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">Services</a>
        <a href="#" class="text-gray-600 hover:text-gray-900">Contact</a>
      </nav>
    </div>
  </header>

  <main class="max-w-7xl mx-auto px-4">
    <!-- Hero Section -->
    <section class="py-20 text-center">
      <h2 class="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
        Welcome to Your Amazing Website
      </h2>
      <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        This beautiful, responsive website was created instantly based on your prompt. 
        You can customize every aspect with simple follow-up messages.
      </p>
      <div class="flex flex-col sm:flex-row gap-4 justify-center">
        <button class="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors">
          Get Started
        </button>
        <button class="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors">
          Learn More
        </button>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <h3 class="text-3xl font-bold text-center mb-16 text-gray-900">Key Features</h3>
      <div class="grid md:grid-cols-3 gap-8">
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"/>
            </svg>
          </div>
          <h4 class="text-xl font-semibold mb-2">Professional Design</h4>
          <p class="text-gray-600">Clean, modern design that looks great on all devices</p>
        </div>
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <h4 class="text-xl font-semibold mb-2">Fast Performance</h4>
          <p class="text-gray-600">Optimized for speed and excellent user experience</p>
        </div>
        <div class="text-center p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
          <div class="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg class="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 20 20">
              <path d="M12 15v2a1 1 0 01-1 1H9a1 1 0 01-1-1v-2M8 7V5a4 4 0 118 0v2m-8 0h8m-8 0a2 2 0 00-2 2v6a2 2 0 002 2h8a2 2 0 002-2V9a2 2 0 00-2-2"/>
            </svg>
          </div>
          <h4 class="text-xl font-semibold mb-2">Fully Customizable</h4>
          <p class="text-gray-600">Easy to modify with simple text prompts</p>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white text-center">
      <h3 class="text-3xl font-bold mb-6">Ready to Get Started?</h3>
      <p class="text-xl mb-8 text-blue-100">
        This is just the beginning. Customize this website with follow-up prompts!
      </p>
      <button class="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors">
        Start Customizing
      </button>
    </section>
  </main>
</div>`;
  }
}
