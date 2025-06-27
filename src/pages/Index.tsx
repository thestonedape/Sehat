
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Activity, Users, Code, Shield, Zap, Heart, ArrowRight, Stethoscope, UserCheck } from "lucide-react";
import { Link } from "react-router-dom";

const Index = () => {
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
              <Link to="/about" className="text-gray-300 hover:text-emerald-400 transition-colors font-medium">
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="text-center mb-20">
          <div className="flex justify-center mb-8">
            <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-teal-600/20 rounded-3xl border border-emerald-500/30 shadow-2xl shadow-emerald-500/10">
              <Activity className="w-20 h-20 text-emerald-400" />
            </div>
          </div>
          <h1 className="text-7xl font-bold mb-8 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent leading-tight">
            SEHAT
          </h1>
          <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed mb-12 font-light">
            Advanced AI-powered skin health analysis platform. 
            Professional medical insights with cutting-edge technology for better healthcare outcomes.
          </p>
          <Link to="/analyze">
            <Button size="lg" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl font-semibold rounded-2xl shadow-2xl shadow-emerald-500/20 transition-all duration-300 hover:scale-105">
              Start Analysis
              <ArrowRight className="w-6 h-6 ml-3" />
            </Button>
          </Link>
        </div>

        {/* User Categories */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {/* Patients */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm rounded-3xl group">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rounded-2xl border border-blue-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-12 h-12 text-blue-400" />
                </div>
              </div>
              <CardTitle className="text-3xl text-blue-400 font-bold mb-3">
                For Patients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CardDescription className="text-gray-300 text-lg leading-relaxed">
                Get instant skin health insights with our AI-powered analysis. Upload photos and receive professional-grade assessments.
              </CardDescription>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">Instant AI analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">Privacy-first approach</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <span className="text-gray-400">Clear recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Doctors */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm rounded-3xl group">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-br from-emerald-500/20 to-green-600/20 rounded-2xl border border-emerald-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="w-12 h-12 text-emerald-400" />
                </div>
              </div>
              <CardTitle className="text-3xl text-emerald-400 font-bold mb-3">
                For Doctors
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CardDescription className="text-gray-300 text-lg leading-relaxed">
                Enhance your practice with AI-assisted diagnostics. Improve accuracy and efficiency in dermatological assessments.
              </CardDescription>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-400">Clinical-grade accuracy</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-400">Diagnostic support</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                  <span className="text-gray-400">Patient workflow integration</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Developers */}
          <Card className="bg-gray-900/50 border-gray-800 hover:border-emerald-500/50 transition-all duration-500 hover:shadow-2xl hover:shadow-emerald-500/10 backdrop-blur-sm rounded-3xl group">
            <CardHeader className="text-center pb-4">
              <div className="flex justify-center mb-6">
                <div className="p-6 bg-gradient-to-br from-purple-500/20 to-pink-600/20 rounded-2xl border border-purple-500/30 group-hover:scale-110 transition-transform duration-300">
                  <Code className="w-12 h-12 text-purple-400" />
                </div>
              </div>
              <CardTitle className="text-3xl text-purple-400 font-bold mb-3">
                For Developers
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <CardDescription className="text-gray-300 text-lg leading-relaxed">
                Integrate our powerful AI models into your applications. Build the next generation of healthcare solutions.
              </CardDescription>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">RESTful API access</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">Comprehensive documentation</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                  <span className="text-gray-400">Scalable infrastructure</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <Card className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl border border-green-500/30">
                  <Shield className="w-8 h-8 text-green-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-green-400 font-bold mb-2">
                95%+ Accuracy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-lg text-center">
                Clinical-grade AI models trained on extensive dermatological datasets
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-yellow-500/20 to-orange-600/20 rounded-xl border border-yellow-500/30">
                  <Zap className="w-8 h-8 text-yellow-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-yellow-400 font-bold mb-2">
                Instant Results
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-lg text-center">
                Get comprehensive analysis and recommendations in seconds
              </CardDescription>
            </CardContent>
          </Card>

          <Card className="bg-gray-900/30 border-gray-800 hover:bg-gray-900/50 transition-all duration-300 rounded-2xl">
            <CardHeader className="text-center">
              <div className="flex justify-center mb-4">
                <div className="p-4 bg-gradient-to-br from-red-500/20 to-rose-600/20 rounded-xl border border-red-500/30">
                  <Heart className="w-8 h-8 text-red-400" />
                </div>
              </div>
              <CardTitle className="text-2xl text-red-400 font-bold mb-2">
                Trusted Care
              </CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-gray-300 text-lg text-center">
                Developed with medical professionals for reliable healthcare insights
              </CardDescription>
            </CardContent>
          </Card>
        </div>

        {/* Medical Disclaimer */}
        <div className="text-center">
          <Card className="bg-amber-500/10 border-amber-500/30 max-w-4xl mx-auto rounded-2xl">
            <CardContent className="pt-8">
              <div className="flex items-start justify-center space-x-4">
                <div className="p-3 bg-amber-500/20 rounded-xl border border-amber-500/30">
                  <Shield className="w-6 h-6 text-amber-400" />
                </div>
                <div className="text-left">
                  <p className="text-amber-400 font-bold text-xl mb-3">Medical Disclaimer</p>
                  <p className="text-gray-300 text-lg leading-relaxed">
                    SEHAT is designed for educational and informational purposes. This AI tool should complement, 
                    not replace, professional medical consultation. Always seek qualified medical advice for proper 
                    diagnosis and treatment decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Index;
