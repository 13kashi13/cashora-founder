import { motion } from "framer-motion";
import { Check, Sparkles, Zap, Crown } from "lucide-react";

const PricingSection = () => {
  const plans = [
    {
      name: "Starter",
      price: "$29",
      period: "/month",
      description: "Perfect for individuals getting started",
      icon: Sparkles,
      features: [
        "10 AI-generated videos/month",
        "5 platform distribution",
        "Basic analytics",
        "Email support",
        "720p video quality",
      ],
      popular: false,
      gradient: "from-green-500/10 to-cyan-500/10",
      borderGradient: "from-green-500/30 to-cyan-500/30",
    },
    {
      name: "Pro",
      price: "$79",
      period: "/month",
      description: "For creators building their brand",
      icon: Zap,
      features: [
        "50 AI-generated videos/month",
        "15 platform distribution",
        "Advanced analytics",
        "Priority support",
        "1080p video quality",
        "Custom branding",
        "API access",
      ],
      popular: true,
      gradient: "from-green-400/20 to-cyan-400/20",
      borderGradient: "from-green-400/50 to-cyan-400/50",
    },
    {
      name: "Enterprise",
      price: "$199",
      period: "/month",
      description: "For teams and agencies at scale",
      icon: Crown,
      features: [
        "Unlimited AI videos",
        "All platforms",
        "Real-time analytics",
        "24/7 dedicated support",
        "4K video quality",
        "White-label solution",
        "Custom integrations",
        "Team collaboration",
      ],
      popular: false,
      gradient: "from-green-500/10 to-cyan-500/10",
      borderGradient: "from-green-500/30 to-cyan-500/30",
    },
  ];

  return (
    <section id="pricing" className="section-spacing relative overflow-hidden">
      <div className="container-wide">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 backdrop-blur-xl"
            style={{
              background: 'rgba(124, 255, 178, 0.08)',
              border: '1px solid rgba(124, 255, 178, 0.3)',
            }}
          >
            <Sparkles className="w-4 h-4" style={{ color: '#7CFFB2' }} />
            <span className="text-sm font-medium" style={{ color: 'rgba(124, 255, 178, 0.95)' }}>
              Simple, Transparent Pricing
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{
            background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            Choose Your Plan
          </h2>
          <p className="text-lg max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>
            Start free, scale as you grow. All plans include core features.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative"
              >
                {/* Popular badge */}
                {plan.popular && (
                  <motion.div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-semibold backdrop-blur-xl z-10"
                    style={{
                      background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
                      color: '#000',
                      boxShadow: '0 0 30px rgba(30, 215, 96, 0.5)',
                    }}
                    animate={{
                      boxShadow: ['0 0 30px rgba(30, 215, 96, 0.5)', '0 0 40px rgba(30, 215, 96, 0.7)', '0 0 30px rgba(30, 215, 96, 0.5)'],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                <motion.div
                  className={`relative h-full backdrop-blur-2xl rounded-3xl p-8 ${plan.popular ? 'scale-105' : ''}`}
                  style={{
                    background: `linear-gradient(135deg, ${plan.gradient.split(' ')[1]}, ${plan.gradient.split(' ')[3]})`,
                    border: `1px solid transparent`,
                    backgroundImage: `linear-gradient(rgba(5, 10, 10, 0.6), rgba(5, 10, 10, 0.6)), linear-gradient(135deg, ${plan.borderGradient.split(' ')[1]}, ${plan.borderGradient.split(' ')[3]})`,
                    backgroundOrigin: 'border-box',
                    backgroundClip: 'padding-box, border-box',
                    boxShadow: plan.popular 
                      ? '0 0 60px rgba(124, 255, 178, 0.2), 0 20px 60px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
                      : '0 0 40px rgba(124, 255, 178, 0.1), 0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.05)',
                  }}
                  whileHover={{
                    scale: plan.popular ? 1.05 : 1.02,
                    boxShadow: '0 0 80px rgba(124, 255, 178, 0.3), 0 20px 60px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.15)',
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <div className="mb-6">
                    <div
                      className="inline-flex p-3 rounded-2xl backdrop-blur-xl"
                      style={{
                        background: 'rgba(124, 255, 178, 0.1)',
                        border: '1px solid rgba(124, 255, 178, 0.3)',
                        boxShadow: '0 0 20px rgba(124, 255, 178, 0.2)',
                      }}
                    >
                      <Icon className="w-6 h-6" style={{ color: '#7CFFB2' }} />
                    </div>
                  </div>

                  {/* Plan name */}
                  <h3 className="text-2xl font-bold mb-2" style={{ color: '#E5E7EB' }}>
                    {plan.name}
                  </h3>
                  <p className="text-sm mb-6" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-8">
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold" style={{
                        background: 'linear-gradient(90deg, #7CFFB2 0%, #5CE1E6 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                      }}>
                        {plan.price}
                      </span>
                      <span className="text-lg" style={{ color: 'rgba(255, 255, 255, 0.5)' }}>
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div
                          className="mt-0.5 p-1 rounded-full"
                          style={{
                            background: 'rgba(124, 255, 178, 0.2)',
                          }}
                        >
                          <Check className="w-3 h-3" style={{ color: '#7CFFB2' }} />
                        </div>
                        <span className="text-sm" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <motion.button
                    className="w-full py-3 rounded-xl font-semibold relative overflow-hidden"
                    style={plan.popular ? {
                      background: 'linear-gradient(90deg, #1ED760, #5CE1E6)',
                      color: '#000',
                      boxShadow: '0 0 30px rgba(30, 215, 96, 0.4)',
                    } : {
                      background: 'rgba(124, 255, 178, 0.1)',
                      border: '1px solid rgba(124, 255, 178, 0.3)',
                      color: 'rgba(124, 255, 178, 0.95)',
                    }}
                    whileHover={plan.popular ? {
                      boxShadow: '0 0 40px rgba(30, 215, 96, 0.6)',
                      scale: 1.02,
                    } : {
                      background: 'rgba(124, 255, 178, 0.15)',
                      scale: 1.02,
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full animate-shimmer" />
                    Get Started
                  </motion.button>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
