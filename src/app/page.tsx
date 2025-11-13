'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { CheckCircle, Star, Users, Target, Zap, ArrowRight, ArrowLeft, Crown, Heart, Sparkles, Award, TrendingUp, Shield, Scale, Utensils, Clock, Brain, Dumbbell, Apple, Coffee, Moon, Calendar } from 'lucide-react'

type QuizStep = {
  id: number
  question: string
  subtitle: string
  options: { value: string; label: string; emoji: string; description?: string }[]
  category: 'goal' | 'physical' | 'lifestyle' | 'nutrition' | 'mindset'
}

type QuizAnswers = {
  goal: string
  currentWeight: string
  targetWeight: string
  height: string
  age: string
  gender: string
  activity: string
  diet: string
  experience: string
  motivation: string
  challenges: string
  sleep: string
  water: string
  meals: string
  restrictions: string
}

const quizSteps: QuizStep[] = [
  {
    id: 1,
    category: 'goal',
    question: "Qual é o teu objetivo principal?",
    subtitle: "Vamos criar um plano personalizado para ti",
    options: [
      { value: "lose", label: "Perder peso", emoji: "🎯", description: "Reduzir gordura corporal de forma saudável" },
      { value: "gain", label: "Ganhar peso", emoji: "💪", description: "Aumentar massa corporal de forma equilibrada" },
      { value: "muscle", label: "Ganhar massa muscular", emoji: "🏋️", description: "Desenvolver músculos e força" },
      { value: "maintain", label: "Manter peso saudável", emoji: "⚖️", description: "Estabilizar e manter resultados" }
    ]
  },
  {
    id: 2,
    category: 'physical',
    question: "Qual é o teu género?",
    subtitle: "Isto ajuda-nos a calcular as tuas necessidades calóricas",
    options: [
      { value: "male", label: "Masculino", emoji: "👨", description: "Metabolismo masculino" },
      { value: "female", label: "Feminino", emoji: "👩", description: "Metabolismo feminino" },
      { value: "other", label: "Prefiro não dizer", emoji: "🧑", description: "Plano neutro personalizado" }
    ]
  },
  {
    id: 3,
    category: 'physical',
    question: "Qual é a tua faixa etária?",
    subtitle: "A idade influencia o metabolismo e necessidades nutricionais",
    options: [
      { value: "18-25", label: "18-25 anos", emoji: "🌟", description: "Metabolismo acelerado" },
      { value: "26-35", label: "26-35 anos", emoji: "💼", description: "Fase produtiva" },
      { value: "36-45", label: "36-45 anos", emoji: "🎯", description: "Maturidade ativa" },
      { value: "46-55", label: "46-55 anos", emoji: "🧘", description: "Equilíbrio e bem-estar" },
      { value: "56+", label: "56+ anos", emoji: "👑", description: "Saúde e vitalidade" }
    ]
  },
  {
    id: 4,
    category: 'physical',
    question: "Como descreverias o teu peso atual?",
    subtitle: "Sê honesto - isto é confidencial e essencial para o teu plano",
    options: [
      { value: "underweight", label: "Abaixo do peso", emoji: "📉", description: "IMC < 18.5" },
      { value: "normal", label: "Peso normal", emoji: "✅", description: "IMC 18.5-24.9" },
      { value: "overweight", label: "Acima do peso", emoji: "📈", description: "IMC 25-29.9" },
      { value: "obese", label: "Obesidade", emoji: "🔴", description: "IMC > 30" }
    ]
  },
  {
    id: 5,
    category: 'goal',
    question: "Quanto peso queres perder/ganhar?",
    subtitle: "Define uma meta realista e alcançável",
    options: [
      { value: "1-5kg", label: "1-5 kg", emoji: "🎯", description: "Ajuste fino" },
      { value: "5-10kg", label: "5-10 kg", emoji: "🏃", description: "Transformação moderada" },
      { value: "10-20kg", label: "10-20 kg", emoji: "🚀", description: "Grande mudança" },
      { value: "20kg+", label: "Mais de 20 kg", emoji: "🏔️", description: "Transformação total" }
    ]
  },
  {
    id: 6,
    category: 'lifestyle',
    question: "Qual o teu nível de atividade física?",
    subtitle: "Isto determina as tuas necessidades calóricas diárias",
    options: [
      { value: "sedentary", label: "Sedentário", emoji: "🛋️", description: "Pouco ou nenhum exercício" },
      { value: "light", label: "Atividade ligeira", emoji: "🚶", description: "Exercício 1-3x por semana" },
      { value: "moderate", label: "Atividade moderada", emoji: "🏃", description: "Exercício 3-5x por semana" },
      { value: "intense", label: "Atividade intensa", emoji: "🏋️", description: "Exercício 6-7x por semana" },
      { value: "athlete", label: "Atleta", emoji: "🏆", description: "Treino profissional" }
    ]
  },
  {
    id: 7,
    category: 'nutrition',
    question: "Como é a tua alimentação atual?",
    subtitle: "Precisamos saber de onde estás a partir",
    options: [
      { value: "poor", label: "Muito desregrada", emoji: "🍔", description: "Fast food frequente, sem rotina" },
      { value: "average", label: "Mais ou menos", emoji: "🥗", description: "Algumas refeições saudáveis" },
      { value: "good", label: "Bem equilibrada", emoji: "🥙", description: "Maioria das refeições saudáveis" },
      { value: "excellent", label: "Muito saudável", emoji: "🥬", description: "Dieta consistentemente equilibrada" }
    ]
  },
  {
    id: 8,
    category: 'nutrition',
    question: "Quantas refeições fazes por dia?",
    subtitle: "Vamos otimizar a tua rotina alimentar",
    options: [
      { value: "1-2", label: "1-2 refeições", emoji: "🍽️", description: "Poucas refeições" },
      { value: "3", label: "3 refeições", emoji: "🍽️🍽️", description: "Padrão tradicional" },
      { value: "4-5", label: "4-5 refeições", emoji: "🍽️🍽️🍽️", description: "Várias refeições pequenas" },
      { value: "6+", label: "6+ refeições", emoji: "🍽️🍽️🍽️🍽️", description: "Muitas refeições" }
    ]
  },
  {
    id: 9,
    category: 'nutrition',
    question: "Tens alguma restrição alimentar?",
    subtitle: "Vamos adaptar o plano às tuas necessidades",
    options: [
      { value: "none", label: "Nenhuma", emoji: "✅", description: "Como de tudo" },
      { value: "vegetarian", label: "Vegetariano", emoji: "🥗", description: "Sem carne" },
      { value: "vegan", label: "Vegano", emoji: "🌱", description: "Sem produtos animais" },
      { value: "lactose", label: "Intolerância à lactose", emoji: "🥛", description: "Sem laticínios" },
      { value: "gluten", label: "Intolerância ao glúten", emoji: "🌾", description: "Sem glúten" },
      { value: "other", label: "Outras restrições", emoji: "⚠️", description: "Alergias específicas" }
    ]
  },
  {
    id: 10,
    category: 'lifestyle',
    question: "Quantas horas dormes por noite?",
    subtitle: "O sono é crucial para os resultados",
    options: [
      { value: "less-5", label: "Menos de 5 horas", emoji: "😴", description: "Sono insuficiente" },
      { value: "5-6", label: "5-6 horas", emoji: "😪", description: "Sono abaixo do ideal" },
      { value: "7-8", label: "7-8 horas", emoji: "😊", description: "Sono ideal" },
      { value: "more-8", label: "Mais de 8 horas", emoji: "😌", description: "Sono abundante" }
    ]
  },
  {
    id: 11,
    category: 'lifestyle',
    question: "Quantos litros de água bebes por dia?",
    subtitle: "A hidratação é fundamental para o metabolismo",
    options: [
      { value: "less-1", label: "Menos de 1L", emoji: "💧", description: "Desidratação" },
      { value: "1-2", label: "1-2 litros", emoji: "💧💧", description: "Hidratação básica" },
      { value: "2-3", label: "2-3 litros", emoji: "💧💧💧", description: "Hidratação adequada" },
      { value: "more-3", label: "Mais de 3L", emoji: "💧💧💧💧", description: "Muito bem hidratado" }
    ]
  },
  {
    id: 12,
    category: 'mindset',
    question: "Qual a tua experiência com dietas?",
    subtitle: "Vamos aprender com o teu histórico",
    options: [
      { value: "none", label: "Nunca fiz dieta", emoji: "🆕", description: "Primeira vez" },
      { value: "some", label: "Já tentei algumas", emoji: "🔄", description: "Algumas tentativas" },
      { value: "many", label: "Tentei muitas vezes", emoji: "📚", description: "Várias experiências" },
      { value: "expert", label: "Tenho muita experiência", emoji: "🎓", description: "Muito experiente" }
    ]
  },
  {
    id: 13,
    category: 'mindset',
    question: "Qual é a tua maior motivação?",
    subtitle: "Isto vai ajudar-nos a manter-te focado",
    options: [
      { value: "health", label: "Saúde", emoji: "❤️", description: "Melhorar bem-estar geral" },
      { value: "appearance", label: "Aparência", emoji: "✨", description: "Sentir-me melhor comigo" },
      { value: "energy", label: "Mais energia", emoji: "⚡", description: "Ter mais disposição" },
      { value: "confidence", label: "Confiança", emoji: "💪", description: "Aumentar autoestima" },
      { value: "medical", label: "Razões médicas", emoji: "🏥", description: "Recomendação médica" }
    ]
  },
  {
    id: 14,
    category: 'mindset',
    question: "Qual é o teu maior desafio?",
    subtitle: "Vamos criar estratégias para superar isto",
    options: [
      { value: "time", label: "Falta de tempo", emoji: "⏰", description: "Rotina muito ocupada" },
      { value: "motivation", label: "Falta de motivação", emoji: "😔", description: "Dificuldade em manter foco" },
      { value: "knowledge", label: "Falta de conhecimento", emoji: "❓", description: "Não sei o que comer" },
      { value: "cravings", label: "Desejos alimentares", emoji: "🍰", description: "Dificuldade em resistir" },
      { value: "social", label: "Pressão social", emoji: "👥", description: "Eventos e saídas" },
      { value: "stress", label: "Stress e ansiedade", emoji: "😰", description: "Comer emocional" }
    ]
  },
  {
    id: 15,
    category: 'goal',
    question: "Em quanto tempo queres atingir o teu objetivo?",
    subtitle: "Vamos criar um plano realista e sustentável",
    options: [
      { value: "1-month", label: "1 mês", emoji: "🚀", description: "Transformação rápida" },
      { value: "3-months", label: "3 meses", emoji: "🎯", description: "Ritmo acelerado" },
      { value: "6-months", label: "6 meses", emoji: "📈", description: "Progressão sólida" },
      { value: "1-year", label: "1 ano", emoji: "🏆", description: "Mudança sustentável" },
      { value: "flexible", label: "Sem pressa", emoji: "🌱", description: "No meu ritmo" }
    ]
  }
]

export default function NutritionApp() {
  const [currentView, setCurrentView] = useState<'landing' | 'quiz' | 'results' | 'payment'>('landing')
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  const [selectedPlan, setSelectedPlan] = useState<string>('')

  const handleAnswerSelect = (value: string) => {
    const stepKey = [
      'goal', 'gender', 'age', 'currentWeight', 'targetWeight', 'activity', 
      'diet', 'meals', 'restrictions', 'sleep', 'water', 'experience', 
      'motivation', 'challenges', 'timeline'
    ][currentStep] as keyof QuizAnswers
    
    setAnswers(prev => ({ ...prev, [stepKey]: value }))
    
    if (currentStep < quizSteps.length - 1) {
      setTimeout(() => setCurrentStep(prev => prev + 1), 400)
    } else {
      setTimeout(() => setCurrentView('results'), 600)
    }
  }

  const getPersonalizedPlan = () => {
    const isLosing = answers.goal === 'lose'
    const isGaining = answers.goal === 'gain' || answers.goal === 'muscle'
    
    return {
      title: isLosing ? 'Plano de Emagrecimento Personalizado' : isGaining ? 'Plano de Ganho de Massa' : 'Plano de Manutenção Premium',
      description: isLosing 
        ? 'Programa científico para queimar gordura preservando massa muscular'
        : isGaining 
        ? 'Sistema estratégico para ganhar peso e massa muscular de forma saudável'
        : 'Protocolo equilibrado para manter o teu peso ideal com saúde',
      color: isLosing ? 'from-rose-500 via-pink-500 to-fuchsia-600' : isGaining ? 'from-emerald-500 via-teal-500 to-cyan-600' : 'from-blue-500 via-indigo-500 to-purple-600'
    }
  }

  const getCurrentCategory = () => {
    const category = quizSteps[currentStep]?.category
    const categoryInfo = {
      goal: { icon: Target, label: 'Objetivos', color: 'from-purple-500 to-pink-500' },
      physical: { icon: Scale, label: 'Perfil Físico', color: 'from-blue-500 to-cyan-500' },
      lifestyle: { icon: Dumbbell, label: 'Estilo de Vida', color: 'from-emerald-500 to-teal-500' },
      nutrition: { icon: Apple, label: 'Nutrição', color: 'from-orange-500 to-amber-500' },
      mindset: { icon: Brain, label: 'Mentalidade', color: 'from-indigo-500 to-purple-500' }
    }
    return categoryInfo[category] || categoryInfo.goal
  }

  if (currentView === 'landing') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 relative overflow-hidden">
        {/* Premium animated background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-950/60 to-slate-950"></div>

        {/* Hero Section */}
        <div className="relative">
          <div className="container mx-auto px-4 py-20 md:py-28">
            <div className="text-center">
              {/* Premium Badge */}
              <div className="inline-flex items-center gap-3 mb-10 px-8 py-4 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/40 backdrop-blur-md shadow-2xl">
                <Crown className="h-6 w-6 text-amber-400 animate-pulse" />
                <span className="text-amber-100 font-bold text-base tracking-wider">LÍDER EM NUTRIÇÃO PORTUGUESA</span>
                <Crown className="h-6 w-6 text-amber-400 animate-pulse" />
              </div>

              {/* Main Title */}
              <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-black mb-8 tracking-tighter leading-none">
                <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent drop-shadow-2xl">
                  NutriLuso
                </span>
              </h1>

              {/* Subtitle */}
              <div className="flex items-center justify-center gap-4 mb-10">
                <div className="h-px w-16 bg-gradient-to-r from-transparent to-purple-500"></div>
                <p className="text-2xl md:text-3xl text-purple-200 font-light tracking-wide">
                  Transformação Nutricional Premium 🇵🇹
                </p>
                <div className="h-px w-16 bg-gradient-to-l from-transparent to-purple-500"></div>
              </div>

              {/* Value Proposition */}
              <p className="text-3xl md:text-5xl mb-16 text-white/95 max-w-6xl mx-auto font-light leading-relaxed">
                O método científico mais completo para{' '}
                <span className="font-black bg-gradient-to-r from-amber-400 via-orange-400 to-pink-400 bg-clip-text text-transparent">
                  transformar o teu corpo
                </span>
                {' '}de forma sustentável
              </p>
              
              {/* Premium Stats */}
              <div className="flex flex-wrap justify-center gap-12 md:gap-20 mb-20 max-w-5xl mx-auto">
                <div className="text-center group cursor-default">
                  <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    75K+
                  </div>
                  <div className="text-slate-300 font-semibold text-base md:text-lg tracking-wide">Vidas Transformadas</div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="flex items-center justify-center gap-2 mb-3">
                    <span className="text-6xl md:text-7xl font-black bg-gradient-to-br from-amber-400 to-orange-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">4.9</span>
                    <Star className="h-10 w-10 text-amber-400 fill-amber-400 group-hover:rotate-12 transition-transform duration-300" />
                  </div>
                  <div className="text-slate-300 font-semibold text-base md:text-lg tracking-wide">Avaliação Média</div>
                </div>
                <div className="text-center group cursor-default">
                  <div className="text-6xl md:text-7xl font-black bg-gradient-to-br from-pink-400 to-rose-400 bg-clip-text text-transparent mb-3 group-hover:scale-110 transition-transform duration-300">
                    97%
                  </div>
                  <div className="text-slate-300 font-semibold text-base md:text-lg tracking-wide">Taxa de Sucesso</div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="relative inline-block group mb-12">
                <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
                <Button 
                  onClick={() => setCurrentView('quiz')}
                  size="lg"
                  className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white text-2xl md:text-3xl px-16 md:px-20 py-8 md:py-10 rounded-full shadow-2xl border-0 font-black tracking-wide group-hover:scale-105 transition-all duration-300"
                >
                  <Sparkles className="mr-4 h-8 w-8 md:h-9 md:w-9" />
                  Iniciar Avaliação Completa
                  <ArrowRight className="ml-4 h-8 w-8 md:h-9 md:w-9 group-hover:translate-x-2 transition-transform" />
                </Button>
              </div>
              
              <p className="text-slate-300 text-lg md:text-xl">
                <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40 backdrop-blur-sm">
                  <Zap className="h-5 w-5 text-emerald-400 animate-pulse" />
                  <span className="font-bold text-emerald-300">Oferta Exclusiva:</span>
                  <span className="text-white font-semibold">60% desconto nos primeiros 100 lugares</span>
                </span>
              </p>
            </div>
          </div>
        </div>

        {/* Premium Features Section */}
        <div className="relative py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-24">
              <Badge className="mb-6 bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-500/40 text-purple-200 px-6 py-3 text-lg font-bold">
                MÉTODO CIENTÍFICO
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Porquê NutriLuso?
              </h2>
              <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-light">
                A solução mais completa para a tua transformação nutricional
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {/* Feature 1 */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md hover:from-slate-800/80 hover:to-slate-900/80 transition-all duration-500 hover:scale-105 hover:-translate-y-3 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10 pt-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                    <Target className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-black text-white mb-6">
                    100% Personalizado
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-10">
                  <p className="text-slate-300 text-xl leading-relaxed text-center">
                    Planos nutricionais únicos baseados em 15 parâmetros do teu perfil, objetivos e preferências portuguesas
                  </p>
                </CardContent>
              </Card>

              {/* Feature 2 */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md hover:from-slate-800/80 hover:to-slate-900/80 transition-all duration-500 hover:scale-105 hover:-translate-y-3 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10 pt-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                    <Users className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-black text-white mb-6">
                    Suporte Premium
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-10">
                  <p className="text-slate-300 text-xl leading-relaxed text-center">
                    Equipa de nutricionistas portugueses certificados disponível 24/7 para te acompanhar em cada passo
                  </p>
                </CardContent>
              </Card>

              {/* Feature 3 */}
              <Card className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md hover:from-slate-800/80 hover:to-slate-900/80 transition-all duration-500 hover:scale-105 hover:-translate-y-3 shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <CardHeader className="text-center relative z-10 pt-10">
                  <div className="w-24 h-24 bg-gradient-to-br from-amber-500 to-orange-500 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl group-hover:rotate-6 group-hover:scale-110 transition-transform duration-500">
                    <Award className="h-12 w-12 text-white" />
                  </div>
                  <CardTitle className="text-3xl md:text-4xl font-black text-white mb-6">
                    Resultados Garantidos
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 pb-10">
                  <p className="text-slate-300 text-xl leading-relaxed text-center">
                    Método cientificamente validado com 97% de taxa de sucesso comprovada entre utilizadores portugueses
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="relative py-32 md:py-40">
          <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-purple-950/40 to-slate-950"></div>
          <div className="container mx-auto px-4 relative">
            <div className="text-center mb-24">
              <Badge className="mb-6 bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/40 text-emerald-200 px-6 py-3 text-lg font-bold">
                HISTÓRIAS REAIS
              </Badge>
              <h2 className="text-5xl md:text-7xl font-black mb-8 text-white">
                Transformações Inspiradoras
              </h2>
              <p className="text-2xl text-slate-400 max-w-3xl mx-auto font-light">
                Milhares de portugueses já mudaram as suas vidas
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-10 max-w-7xl mx-auto">
              {[
                { name: "Maria Silva", location: "Lisboa", result: "-18kg em 4 meses", image: "👩‍💼", quote: "Mudou completamente a minha relação com a comida. Sinto-me incrível e cheia de energia!" },
                { name: "João Santos", location: "Porto", result: "+12kg massa muscular", image: "👨‍💻", quote: "Finalmente consegui ganhar peso de forma saudável. O suporte foi fundamental!" },
                { name: "Ana Costa", location: "Coimbra", result: "-25kg em 7 meses", image: "👩‍🎓", quote: "O melhor investimento que fiz na minha saúde. Resultados que nunca imaginei!" }
              ].map((testimonial, index) => (
                <Card key={index} className="group relative overflow-hidden border-0 bg-gradient-to-br from-slate-800/90 to-slate-900/90 backdrop-blur-xl hover:from-slate-800 hover:to-slate-900 transition-all duration-500 hover:scale-105 shadow-2xl">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <CardContent className="p-10 relative z-10">
                    <div className="flex items-start mb-8">
                      <div className="text-6xl mr-5">{testimonial.image}</div>
                      <div className="flex-1">
                        <div className="font-black text-white text-2xl mb-2">{testimonial.name}</div>
                        <div className="text-purple-300 font-semibold mb-3 text-lg">{testimonial.location}</div>
                        <Badge className="bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-emerald-500/40 font-bold text-base px-4 py-1.5">
                          {testimonial.result}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex text-amber-400 mb-6">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-6 w-6 fill-current" />
                      ))}
                    </div>
                    <p className="text-slate-300 text-xl leading-relaxed italic">
                      "{testimonial.quote}"
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="relative py-32">
          <div className="container mx-auto px-4 text-center">
            <h3 className="text-4xl md:text-6xl font-black text-white mb-12 leading-tight">
              Pronto para a tua transformação?
            </h3>
            <div className="relative inline-block group">
              <div className="absolute -inset-2 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <Button 
                onClick={() => setCurrentView('quiz')}
                size="lg"
                className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white text-2xl md:text-3xl px-16 md:px-20 py-8 md:py-10 rounded-full shadow-2xl border-0 font-black tracking-wide group-hover:scale-105 transition-all duration-300"
              >
                <Heart className="mr-4 h-8 w-8 md:h-9 md:w-9 animate-pulse" />
                Começar Agora
                <ArrowRight className="ml-4 h-8 w-8 md:h-9 md:w-9 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'quiz') {
    const progress = ((currentStep + 1) / quizSteps.length) * 100
    const categoryInfo = getCurrentCategory()
    const CategoryIcon = categoryInfo.icon

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <Card className="w-full max-w-4xl shadow-2xl border-0 bg-slate-800/95 backdrop-blur-xl relative">
          <CardHeader className="pb-10">
            <div className="flex items-center justify-between mb-10">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => currentStep > 0 ? setCurrentStep(prev => prev - 1) : setCurrentView('landing')}
                className="text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors text-base px-5 py-2.5"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar
              </Button>
              <Badge className={`bg-gradient-to-r ${categoryInfo.color} text-white border-0 px-6 py-2.5 text-base font-bold flex items-center gap-2`}>
                <CategoryIcon className="h-5 w-5" />
                {categoryInfo.label}
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-6 py-2.5 text-base font-bold">
                {currentStep + 1}/{quizSteps.length}
              </Badge>
            </div>

            {/* Progress Bar */}
            <div className="relative mb-12">
              <div className="h-4 bg-slate-700 rounded-full overflow-hidden shadow-inner">
                <div 
                  className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-full transition-all duration-700 ease-out shadow-lg"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="absolute -top-1 right-0 text-slate-400 text-sm font-semibold">
                {Math.round(progress)}%
              </div>
            </div>

            <CardTitle className="text-4xl md:text-5xl font-black text-white mb-6 text-center leading-tight">
              {quizSteps[currentStep].question}
            </CardTitle>
            <p className="text-slate-400 text-xl text-center font-light">
              {quizSteps[currentStep].subtitle}
            </p>
          </CardHeader>

          <CardContent className="pb-12">
            <div className="grid gap-5">
              {quizSteps[currentStep].options.map((option) => (
                <Button
                  key={option.value}
                  variant="outline"
                  size="lg"
                  onClick={() => handleAnswerSelect(option.value)}
                  className="group h-auto p-8 text-left justify-start bg-slate-700/60 hover:bg-gradient-to-r hover:from-purple-500/30 hover:to-pink-500/30 border-2 border-slate-600 hover:border-purple-400 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl"
                >
                  <span className="text-5xl mr-6 group-hover:scale-125 transition-transform duration-300">{option.emoji}</span>
                  <div className="flex-1">
                    <div className="text-2xl font-bold text-white mb-1">{option.label}</div>
                    {option.description && (
                      <div className="text-base text-slate-400 font-light">{option.description}</div>
                    )}
                  </div>
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (currentView === 'results') {
    const plan = getPersonalizedPlan()

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-40 right-40 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-40 left-40 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl py-16 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <Badge className="mb-8 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-8 py-4 text-xl font-black shadow-2xl">
              <Sparkles className="h-6 w-6 mr-3 inline animate-pulse" />
              PLANO PERSONALIZADO CRIADO
            </Badge>
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              Parabéns! 🎉
            </h1>
            <p className="text-3xl text-slate-300 font-light max-w-4xl mx-auto leading-relaxed">
              Analisámos as tuas <span className="font-bold text-white">15 respostas</span> e criámos um plano nutricional científico único para ti
            </p>
          </div>

          {/* Plan Card */}
          <Card className={`mb-16 border-0 shadow-2xl bg-gradient-to-r ${plan.color} text-white overflow-hidden relative group`}>
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-500"></div>
            <CardHeader className="text-center py-16 relative z-10">
              <div className="flex justify-center items-center gap-4 mb-8">
                <Crown className="h-14 w-14 text-amber-300 animate-pulse" />
                <CardTitle className="text-5xl md:text-6xl font-black">{plan.title}</CardTitle>
                <Crown className="h-14 w-14 text-amber-300 animate-pulse" />
              </div>
              <p className="text-2xl text-white/95 font-light max-w-3xl mx-auto leading-relaxed">
                {plan.description}
              </p>
            </CardHeader>
            <CardContent className="relative z-10 pb-16">
              <div className="grid md:grid-cols-3 gap-10 text-center">
                <div className="group/item cursor-default">
                  <div className="text-4xl font-black mb-3 group-hover/item:scale-110 transition-transform duration-300">Cardápio</div>
                  <div className="text-white/90 text-xl">100% Personalizado</div>
                </div>
                <div className="group/item cursor-default">
                  <div className="text-4xl font-black mb-3 group-hover/item:scale-110 transition-transform duration-300">Suporte</div>
                  <div className="text-white/90 text-xl">24/7 Português</div>
                </div>
                <div className="group/item cursor-default">
                  <div className="text-4xl font-black mb-3 group-hover/item:scale-110 transition-transform duration-300">Garantia</div>
                  <div className="text-white/90 text-xl">30 dias</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Details Grid */}
          <div className="grid md:grid-cols-2 gap-10 mb-16">
            {/* Benefits */}
            <Card className="border-0 shadow-2xl bg-slate-800/95 backdrop-blur-xl hover:bg-slate-800 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-white">
                  <CheckCircle className="h-9 w-9 text-emerald-400 mr-4" />
                  O que vais receber
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-5 text-xl">
                  {[
                    'Plano alimentar 100% português',
                    'Lista de compras semanal otimizada',
                    'Receitas tradicionais adaptadas',
                    'Acompanhamento nutricional premium',
                    'App mobile completa e intuitiva',
                    'Relatórios de progresso detalhados'
                  ].map((benefit, index) => (
                    <li key={index} className="flex items-center text-slate-300 group/item">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 group-hover/item:scale-110 transition-transform flex-shrink-0" />
                      {benefit}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Goals */}
            <Card className="border-0 shadow-2xl bg-slate-800/95 backdrop-blur-xl hover:bg-slate-800 transition-all duration-300">
              <CardHeader>
                <CardTitle className="flex items-center text-3xl text-white">
                  <Target className="h-9 w-9 text-purple-400 mr-4" />
                  O teu perfil único
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 text-lg">Objetivo principal</span>
                    <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-5 py-2 text-base font-bold">
                      {answers.goal === 'lose' ? 'Perder peso' : 
                       answers.goal === 'gain' ? 'Ganhar peso' : 
                       answers.goal === 'muscle' ? 'Ganhar massa' : 'Manter peso'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 text-lg">Meta de peso</span>
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-5 py-2 text-base font-bold">
                      {answers.targetWeight}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 text-lg">Atividade física</span>
                    <Badge className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white border-0 px-5 py-2 text-base font-bold">
                      {answers.activity === 'sedentary' ? 'Sedentário' :
                       answers.activity === 'light' ? 'Ligeira' :
                       answers.activity === 'moderate' ? 'Moderada' : 
                       answers.activity === 'intense' ? 'Intensa' : 'Atleta'}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-slate-300 text-lg">Motivação</span>
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-5 py-2 text-base font-bold">
                      {answers.motivation === 'health' ? 'Saúde' :
                       answers.motivation === 'appearance' ? 'Aparência' :
                       answers.motivation === 'energy' ? 'Energia' :
                       answers.motivation === 'confidence' ? 'Confiança' : 'Médico'}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="relative inline-block group">
              <div className="absolute -inset-3 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 rounded-full blur-2xl opacity-75 group-hover:opacity-100 transition duration-500 animate-pulse"></div>
              <Button
                onClick={() => setCurrentView('payment')}
                size="lg"
                className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 hover:from-amber-600 hover:via-orange-600 hover:to-pink-600 text-white text-3xl px-20 py-10 rounded-full shadow-2xl border-0 font-black group-hover:scale-105 transition-all duration-300"
              >
                <TrendingUp className="mr-4 h-9 w-9" />
                Começar Transformação
                <ArrowRight className="ml-4 h-9 w-9 group-hover:translate-x-2 transition-transform" />
              </Button>
            </div>
            <p className="text-slate-300 mt-10 text-2xl font-light">
              <span className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500/20 border border-emerald-500/40">
                <Zap className="h-6 w-6 text-emerald-400 animate-pulse" />
                <span className="font-bold text-emerald-300">Oferta Especial:</span>
                <span className="text-white font-semibold">60% desconto no primeiro mês</span>
              </span>
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (currentView === 'payment') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 p-4 relative overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>

        <div className="container mx-auto max-w-7xl py-16 relative">
          {/* Header */}
          <div className="text-center mb-20">
            <h1 className="text-6xl md:text-8xl font-black text-white mb-8 drop-shadow-2xl">
              Escolhe o Teu Plano
            </h1>
            <p className="text-3xl text-slate-300 font-light">
              Investe na tua saúde e bem-estar hoje
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-10 mb-20">
            {/* Basic Plan */}
            <Card className="group relative border-0 shadow-2xl bg-slate-800/95 backdrop-blur-xl hover:bg-slate-800 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center relative z-10 pt-10">
                <Badge className="mb-6 bg-slate-700 text-slate-300 px-5 py-3 text-lg font-bold">
                  Básico
                </Badge>
                <CardTitle className="text-4xl font-black text-white mb-4">Plano Mensal</CardTitle>
                <div className="text-6xl font-black text-white mt-8">
                  €37
                  <span className="text-2xl font-normal text-slate-400">/mês</span>
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pb-10">
                <ul className="space-y-5 mb-10 text-xl">
                  {[
                    'Plano alimentar personalizado',
                    'Lista de compras portuguesa',
                    'Suporte por email',
                    'App mobile'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full text-xl py-7 border-2 border-slate-600 hover:bg-slate-700 text-white font-bold"
                  onClick={() => setSelectedPlan('basic')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="group relative border-0 shadow-2xl overflow-hidden bg-slate-800/95 backdrop-blur-xl hover:bg-slate-800 transition-all duration-500 hover:scale-110">
              {/* Popular Badge */}
              <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-amber-500 via-orange-500 to-pink-500 text-white text-center py-4 text-lg font-black tracking-wide z-20">
                ⭐ MAIS POPULAR ⭐
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <CardHeader className="text-center pt-20 relative z-10">
                <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-5 py-3 text-lg font-bold">
                  Premium
                </Badge>
                <CardTitle className="text-4xl font-black text-white mb-4">Plano Trimestral</CardTitle>
                <div className="text-6xl font-black text-white mt-8">
                  €27
                  <span className="text-2xl font-normal text-slate-400">/mês</span>
                </div>
                <div className="text-xl text-emerald-400 font-black mt-3">
                  Poupas €30!
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pb-10">
                <ul className="space-y-5 mb-10 text-xl">
                  {[
                    'Tudo do plano básico',
                    'Receitas tradicionais portuguesas',
                    'Suporte prioritário',
                    'Consultoria nutricional',
                    'Ajustes mensais no plano'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="relative group/btn">
                  <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg blur opacity-75 group-hover/btn:opacity-100 transition duration-300"></div>
                  <Button 
                    className="relative w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xl py-7 border-0 font-black text-white"
                    onClick={() => setSelectedPlan('premium')}
                  >
                    Escolher Plano
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* VIP Plan */}
            <Card className="group relative border-0 shadow-2xl bg-slate-800/95 backdrop-blur-xl hover:bg-slate-800 transition-all duration-500 hover:scale-105 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-amber-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <CardHeader className="text-center relative z-10 pt-10">
                <Badge className="mb-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0 px-5 py-3 text-lg font-bold">
                  VIP
                </Badge>
                <CardTitle className="text-4xl font-black text-white mb-4">Plano Anual</CardTitle>
                <div className="text-6xl font-black text-white mt-8">
                  €19
                  <span className="text-2xl font-normal text-slate-400">/mês</span>
                </div>
                <div className="text-xl text-emerald-400 font-black mt-3">
                  Poupas €216!
                </div>
              </CardHeader>
              <CardContent className="relative z-10 pb-10">
                <ul className="space-y-5 mb-10 text-xl">
                  {[
                    'Tudo do plano premium',
                    'Acompanhamento 1:1',
                    'Suporte 24/7',
                    'Planos para família',
                    'Garantia estendida'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center text-slate-300">
                      <CheckCircle className="h-6 w-6 text-emerald-400 mr-4 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button 
                  variant="outline" 
                  className="w-full border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 text-xl py-7 font-bold"
                  onClick={() => setSelectedPlan('vip')}
                >
                  Escolher Plano
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Guarantee */}
          <div className="text-center">
            <Card className="inline-block border-0 shadow-2xl bg-slate-800/90 backdrop-blur-xl">
              <CardContent className="p-10">
                <div className="flex items-center justify-center text-white gap-5">
                  <Shield className="h-14 w-14 text-emerald-400" />
                  <div className="text-left">
                    <div className="font-black text-3xl">Garantia de 30 dias</div>
                    <div className="text-slate-300 text-xl">100% do teu dinheiro de volta se não ficares satisfeito</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Payment Modal */}
          {selectedPlan && (
            <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50 backdrop-blur-md">
              <Card className="w-full max-w-2xl border-0 shadow-2xl bg-slate-800">
                <CardHeader className="text-center">
                  <CardTitle className="text-4xl font-black text-white">Finalizar Compra</CardTitle>
                  <p className="text-slate-300 text-2xl mt-3">
                    Plano {selectedPlan === 'basic' ? 'Básico' : selectedPlan === 'premium' ? 'Premium' : 'VIP'} selecionado
                  </p>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="text-center p-10 bg-gradient-to-br from-emerald-500/20 to-teal-500/20 rounded-3xl border-2 border-emerald-500/40">
                    <CheckCircle className="h-24 w-24 text-emerald-400 mx-auto mb-8" />
                    <h3 className="text-4xl font-black text-white mb-6">
                      Parabéns! 🎉
                    </h3>
                    <p className="text-slate-200 text-2xl leading-relaxed">
                      O teu plano foi ativado com sucesso! Vais receber um email com todas as instruções para começares a tua transformação.
                    </p>
                  </div>
                  <div className="flex gap-5">
                    <Button 
                      variant="outline" 
                      onClick={() => setSelectedPlan('')}
                      className="flex-1 text-xl py-7 border-slate-600 text-white hover:bg-slate-700"
                    >
                      Fechar
                    </Button>
                    <Button 
                      onClick={() => {
                        setSelectedPlan('')
                        setCurrentView('landing')
                      }}
                      className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-xl py-7 border-0 font-black"
                    >
                      Começar Agora
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    )
  }

  return null
}