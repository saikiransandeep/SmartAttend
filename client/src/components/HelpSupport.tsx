import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  HelpCircle, 
  ChevronDown, 
  ChevronRight, 
  Send,
  Phone,
  Mail,
  MessageCircle,
  BookOpen,
  Search,
  ExternalLink
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  category: string;
  question: string;
  answer: string;
  helpful?: boolean;
}

interface ContactForm {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
  priority: 'low' | 'medium' | 'high';
}

export function HelpSupport() {
  const { toast } = useToast();
  
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFAQs, setOpenFAQs] = useState<string[]>([]);
  
  const [contactForm, setContactForm] = useState<ContactForm>({
    name: '',
    email: '',
    subject: '',
    category: '',
    message: '',
    priority: 'medium'
  });

  // todo: remove mock functionality
  const faqs: FAQ[] = [
    {
      id: '1',
      category: 'Attendance',
      question: 'How do I mark attendance for my class?',
      answer: 'To mark attendance, go to the Dashboard and click on "Mark Attendance". Select your class and subject, then mark each student as Present, Absent, or OD (On Duty). Click "Submit Attendance" to save your entries.'
    },
    {
      id: '2',
      category: 'Attendance',
      question: 'Can I edit attendance after submitting?',
      answer: 'Yes, you can edit attendance within 24 hours of submission. Go to "Attendance Records", find the record you want to edit, and click the edit button. Please note that changes are logged for audit purposes.'
    },
    {
      id: '3',
      category: 'Students',
      question: 'How do I add a new student to the system?',
      answer: 'Navigate to "Student Management" and click "Add Student". Fill in all required information including name, roll number, email, phone, section, and department. Make sure the roll number is unique in the system.'
    },
    {
      id: '4',
      category: 'Reports',
      question: 'How can I generate attendance reports?',
      answer: 'Go to the "Reports" section, select your desired filters (department, subject, date range), choose the report type, and click "Generate PDF" or "Export Excel" to download the report.'
    },
    {
      id: '5',
      category: 'Technical',
      question: 'What browsers are supported?',
      answer: 'The system supports all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, please use the latest version of your preferred browser.'
    },
    {
      id: '6',
      category: 'Technical',
      question: 'I forgot my password. How can I reset it?',
      answer: 'Click on "Forgot Password" on the login page. Enter your registered email address, and you will receive a password reset link. Follow the instructions in the email to create a new password.'
    },
    {
      id: '7',
      category: 'Faculty',
      question: 'How do I update my profile information?',
      answer: 'Go to "Settings" from the sidebar menu. In the Profile Information section, click "Edit Profile" to update your personal details. Remember to save your changes when done.'
    },
    {
      id: '8',
      category: 'Faculty',
      question: 'Can I assign courses to other faculty members?',
      answer: 'Course assignment depends on your role. HoDs and Principals can assign courses through "Course Management". Regular faculty members can only view their assigned courses.'
    },
    {
      id: '9',
      category: 'System',
      question: 'What are the different user roles in the system?',
      answer: 'The system has 5 user roles: Student (view attendance), Faculty (mark attendance), Class Incharge (manage class), HoD (manage department), and Principal (manage institution). Each role has specific permissions.'
    },
    {
      id: '10',
      category: 'System',
      question: 'How often is the data backed up?',
      answer: 'All attendance data is automatically backed up every hour. Weekly full system backups are performed to ensure data integrity and availability. You can also export your data anytime from Settings.'
    }
  ];

  const categories = Array.from(new Set(faqs.map(faq => faq.category)));
  
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (id: string) => {
    setOpenFAQs(prev => 
      prev.includes(id) 
        ? prev.filter(faqId => faqId !== id)
        : [...prev, id]
    );
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!contactForm.name || !contactForm.email || !contactForm.subject || !contactForm.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    console.log('Contact form submitted:', contactForm);
    
    // Reset form
    setContactForm({
      name: '',
      email: '',
      subject: '',
      category: '',
      message: '',
      priority: 'medium'
    });

    toast({
      title: "Message Sent",
      description: "Your message has been sent successfully. We'll get back to you soon.",
    });
  };

  return (
    <div className="space-y-6 max-w-6xl">
      {/* Header */}
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-semibold">Help & Support</h1>
        <p className="text-muted-foreground">
          Find answers to common questions or get in touch with our support team
        </p>
      </div>

      {/* Quick Help Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="hover-elevate">
          <CardContent className="p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-chart-1/10 rounded-lg flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-chart-1" />
            </div>
            <div>
              <h3 className="font-semibold">Getting Started</h3>
              <p className="text-sm text-muted-foreground">
                Learn the basics of using the attendance system
              </p>
            </div>
            <Button variant="outline" size="sm" data-testid="button-getting-started">
              View Guide
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardContent className="p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-chart-2/10 rounded-lg flex items-center justify-center">
              <MessageCircle className="h-6 w-6 text-chart-2" />
            </div>
            <div>
              <h3 className="font-semibold">Live Chat</h3>
              <p className="text-sm text-muted-foreground">
                Chat with our support team in real-time
              </p>
            </div>
            <Button variant="outline" size="sm" data-testid="button-live-chat">
              Start Chat
              <MessageCircle className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>

        <Card className="hover-elevate">
          <CardContent className="p-6 text-center space-y-3">
            <div className="mx-auto w-12 h-12 bg-chart-3/10 rounded-lg flex items-center justify-center">
              <Phone className="h-6 w-6 text-chart-3" />
            </div>
            <div>
              <h3 className="font-semibold">Call Support</h3>
              <p className="text-sm text-muted-foreground">
                Speak directly with our technical support
              </p>
            </div>
            <Button variant="outline" size="sm" data-testid="button-call-support">
              Call Now
              <Phone className="h-4 w-4 ml-2" />
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* FAQ Section */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5" />
                Frequently Asked Questions
              </CardTitle>
              <CardDescription>
                Find quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Search and Filter */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search FAQs..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    data-testid="input-search-faqs"
                  />
                </div>
                
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger data-testid="select-faq-category">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* FAQ List */}
              <div className="space-y-3">
                {filteredFAQs.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    <HelpCircle className="h-12 w-12 mx-auto mb-2 opacity-50" />
                    <p>No FAQs found matching your search.</p>
                  </div>
                ) : (
                  filteredFAQs.map((faq) => (
                    <Collapsible key={faq.id} open={openFAQs.includes(faq.id)} onOpenChange={() => toggleFAQ(faq.id)}>
                      <CollapsibleTrigger className="w-full text-left hover-elevate">
                        <div className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary" className="text-xs">
                              {faq.category}
                            </Badge>
                            <span className="font-medium">{faq.question}</span>
                          </div>
                          {openFAQs.includes(faq.id) ? (
                            <ChevronDown className="h-4 w-4" />
                          ) : (
                            <ChevronRight className="h-4 w-4" />
                          )}
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="px-4 pb-4 text-sm text-muted-foreground">
                          {faq.answer}
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Form */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Contact Support
              </CardTitle>
              <CardDescription>
                Still need help? Send us a message and we'll get back to you
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="contact-name">Name *</Label>
                    <Input
                      id="contact-name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                      data-testid="input-contact-name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Email *</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      data-testid="input-contact-email"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-subject">Subject *</Label>
                  <Input
                    id="contact-subject"
                    value={contactForm.subject}
                    onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                    data-testid="input-contact-subject"
                    placeholder="Brief description of your issue"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Category</Label>
                    <Select 
                      value={contactForm.category} 
                      onValueChange={(value) => setContactForm(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger data-testid="select-contact-category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="technical">Technical Issue</SelectItem>
                        <SelectItem value="account">Account Problem</SelectItem>
                        <SelectItem value="feature">Feature Request</SelectItem>
                        <SelectItem value="bug">Bug Report</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label>Priority</Label>
                    <Select 
                      value={contactForm.priority} 
                      onValueChange={(value: 'low' | 'medium' | 'high') => setContactForm(prev => ({ ...prev, priority: value }))}
                    >
                      <SelectTrigger data-testid="select-contact-priority">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contact-message">Message *</Label>
                  <Textarea
                    id="contact-message"
                    value={contactForm.message}
                    onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                    data-testid="textarea-contact-message"
                    placeholder="Please describe your issue or question in detail..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" className="w-full" data-testid="button-send-message">
                  <Send className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle>Other Ways to Reach Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Phone className="h-5 w-5 text-chart-3" />
                <div>
                  <p className="font-medium">Phone Support</p>
                  <p className="text-sm text-muted-foreground">+1 (555) 123-4567</p>
                  <p className="text-xs text-muted-foreground">Mon-Fri, 9AM-6PM EST</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <Mail className="h-5 w-5 text-chart-2" />
                <div>
                  <p className="font-medium">Email Support</p>
                  <p className="text-sm text-muted-foreground">support@attendance.edu</p>
                  <p className="text-xs text-muted-foreground">Response within 24 hours</p>
                </div>
              </div>

              <div className="flex items-center gap-3 p-3 border rounded-lg">
                <MessageCircle className="h-5 w-5 text-chart-1" />
                <div>
                  <p className="font-medium">Live Chat</p>
                  <p className="text-sm text-muted-foreground">Available now</p>
                  <p className="text-xs text-muted-foreground">Average response: 2 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}