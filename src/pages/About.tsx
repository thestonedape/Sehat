
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, Shield, Users, Award, ArrowLeft, Brain, Heart, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Navigation */}
      <nav className="border-b border-gray-800 bg-gray-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl">
                <Activity className="w-8 h-8 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                SEHAT
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <Link to="/" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                Home
              </Link>
              <Link to="/analyze" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                Analyze
              </Link>
              <Link to="/about" className="text-emerald-400 font-semibold">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-6 py-16">
        {/* Back Button */}
        <div className="mb-8">
          <Link to="/">
            <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800 hover:text-white rounded-xl">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* About Section */}
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h1 className="text-6xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">
              About SEHAT
            </h1>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
              Revolutionizing healthcare with AI-powered dermatological analysis. 
              Professional-grade insights accessible to everyone, everywhere.
            </p>
          </div>

          {/* Mission */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-3xl mb-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-white font-bold flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-xl border border-emerald-500/30">
                  <Heart className="w-8 h-8 text-emerald-400" />
                </div>
                Our Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-xl leading-relaxed">
                SEHAT is dedicated to democratizing access to quality dermatological care through 
                cutting-edge AI technology. We bridge the gap between advanced medical expertise 
                and everyday healthcare needs, empowering individuals to take proactive control 
                of their skin health with confidence and precision.
              </p>
            </CardContent>
          </Card>

          {/* Key Features */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-xl border border-blue-500/30">
                    <Brain className="w-8 h-8 text-blue-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Advanced AI Technology</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Our deep learning models are trained on extensive dermatological datasets, 
                  utilizing state-of-the-art computer vision and pattern recognition to deliver 
                  clinical-grade analysis accuracy.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                    <Users className="w-8 h-8 text-green-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Expert Collaboration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Developed in partnership with leading dermatologists, medical researchers, 
                  and healthcare institutions to ensure clinical relevance, accuracy, and 
                  adherence to medical best practices.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-xl border border-purple-500/30">
                    <Award className="w-8 h-8 text-purple-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Clinical Validation</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Our AI system demonstrates 95%+ accuracy in detecting common skin conditions, 
                  validated through rigorous clinical testing and peer-reviewed research protocols.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-2xl hover:shadow-xl hover:shadow-emerald-500/5 transition-all duration-300">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
                    <Zap className="w-8 h-8 text-yellow-400" />
                  </div>
                  <CardTitle className="text-2xl text-white font-bold">Real-time Analysis</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-lg leading-relaxed">
                  Instant processing and comprehensive analysis reduce wait times from weeks 
                  to seconds, enabling faster healthcare decisions and improved patient outcomes.
                </CardDescription>
              </CardContent>
            </Card>
          </div>

          {/* Privacy & Security */}
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm rounded-3xl mb-12 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-white font-bold flex items-center gap-4">
                <div className="p-3 bg-gradient-to-br from-indigo-500/20 to-purple-600/20 rounded-xl border border-indigo-500/30">
                  <Shield className="w-8 h-8 text-indigo-400" />
                </div>
                Privacy & Security
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-xl leading-relaxed">
                Your privacy is paramount. SEHAT employs enterprise-grade encryption, secure data handling, 
                and strict privacy protocols. We never store personal images permanently, and all analysis 
                is conducted with complete confidentiality and HIPAA-compliant security measures.
              </p>
            </CardContent>
          </Card>

          {/* Disclaimer */}
          <Card className="bg-amber-500/10 border-amber-500/30 backdrop-blur-sm rounded-3xl shadow-xl">
            <CardContent className="pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-amber-500/20 rounded-xl border border-amber-500/30">
                    <Shield className="w-10 h-10 text-amber-400" />
                  </div>
                </div>
                <p className="text-amber-400 font-bold text-2xl mb-4">Important Medical Disclaimer</p>
                <p className="text-gray-300 text-lg leading-relaxed max-w-4xl mx-auto">
                  SEHAT is designed to assist and educate, serving as a supplementary tool in healthcare decision-making. 
                  This AI analysis should never replace professional medical consultation, diagnosis, or treatment. 
                  Always consult with qualified healthcare professionals for proper medical evaluation and care. 
                  SEHAT's recommendations are for informational purposes only.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default About;
