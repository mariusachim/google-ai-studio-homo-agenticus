import { ServiceNode } from '../types';

export const awsServicesData: ServiceNode = {
  name: "Choose",
  category: "Decision Root",
  description: "Start here to find the right chemical messenger for your needs.",
  children: [
    {
      name: "Dopamine",
      category: "Neurotransmitter",
      description: "The 'Reward' chemical. Associated with pleasure, motivation, and learning. It reinforces behaviors that lead to rewards.",
      color: "#22c55e", // Green-500 base (inherited by Natural, overridden by others)
      children: [
        {
          name: "Natural",
          category: "Dopamine Source",
          description: "Healthy, sustainable activities that release dopamine naturally. These promote long-term well-being and consistent motivation.",
          color: "#22c55e", // Green-500
          children: [
            {
              name: "Physical",
              category: "Natural Activity",
              description: "Movement releases endorphins and regulates dopamine levels naturally.",
              color: "#22c55e",
              useCases: ["Walking", "Running", "Dancing", "Yoga", "Stretching"]
            },
            {
              name: "Creativity",
              category: "Natural Activity",
              description: "Engaging in creative expression or unstructured play stimulates the reward system without overstimulation.",
              color: "#22c55e",
              useCases: ["Drawing", "Writing", "Improv", "Playing instruments", "Board games"]
            },
            {
              name: "Social",
              category: "Natural Activity",
              description: "Positive social interactions release dopamine along with oxytocin.",
              color: "#22c55e",
              useCases: ["Talking with friends", "Hugs", "Shared meals", "Volunteering"]
            },
            {
              name: "Learning",
              category: "Natural Activity",
              description: "The brain rewards acquiring new information and mastering new skills.",
              color: "#22c55e",
              useCases: ["Reading", "Podcasts", "Learning a language", "Exploring new places"]
            },
            {
              name: "Healthy",
              category: "Natural Activity",
              description: "Enjoying sensory experiences that are calming and grounding.",
              color: "#22c55e",
              useCases: ["Cooking good food", "Nature walks", "Listening to music", "Sunlight exposure"]
            },
            {
              name: "Accomplishment",
              category: "Natural Activity",
              description: "The satisfaction of completing tasks releases dopamine.",
              color: "#22c55e",
              useCases: ["Making the bed", "Finishing a work task", "Cleaning", "Checking off to-do lists"]
            }
          ]
        },
        {
          name: "Medium",
          category: "Dopamine Source",
          description: "Activities providing moderate, often instant gratification. Can be enjoyable but may lead to tolerance or 'cheap' dopamine loops if unchecked.",
          color: "#eab308", // Yellow-500
          children: [
             {
                name: "Digital activities",
                category: "Medium Source",
                description: "Screen-based entertainment that provides quick feedback loops.",
                color: "#eab308",
                useCases: ["Video games", "Streaming series", "Casual browsing"]
             },
             {
                name: "Food",
                category: "Medium Source",
                description: "Calorie-dense or palatable foods that trigger reward pathways.",
                color: "#eab308",
                useCases: ["Sweet treats", "Comfort food", "Snacking"]
             },
             {
                name: "Novelty",
                category: "Medium Source",
                description: "Seeking newness or acquisition for a quick boost.",
                color: "#eab308",
                useCases: ["Online shopping", "Impulse buying", "Checking notifications"]
             }
          ]
        },
        {
          name: "High",
          category: "Dopamine Source",
          description: "Intense, super-stimuli that flood the reward system. These carry high risks of addiction, burnout, and desensitization.",
          color: "#ef4444", // Red-500
          children: [
             {
                name: "Hyper-stimulation",
                category: "High Source",
                description: "Rapid-fire content designed to hijack attention mechanisms.",
                color: "#ef4444",
                useCases: ["Doomscrolling", "Algorithm loops", "Short-form content binge", "Pornography"]
             },
             {
                name: "Substances",
                category: "High Source",
                description: "Chemical interference with natural dopamine regulation.",
                color: "#ef4444",
                useCases: ["Nicotine", "Caffeine abuse", "Alcohol", "Drugs"]
             },
             {
                name: "Risk-taking",
                category: "High Source",
                description: "Variable reward schedules that create compulsive loops.",
                color: "#ef4444",
                useCases: ["Sports betting", "Casinos", "Day trading", "Reckless driving"]
             }
          ]
        }
      ],
      useCases: ["Motivation", "Reward seeking", "Learning", "Focus"]
    },
    {
      name: "Serotonin",
      category: "Neurotransmitter",
      description: "The 'Mood' stabilizer. Regulates well-being, happiness, appetite, and sleep.",
      color: "#0ea5e9", // Sky-500
      children: [
        {
          name: "Nature",
          category: "Serotonin Source",
          description: "Exposure to sunlight and natural environments regulates serotonin production and circadian rhythms.",
          color: "#0ea5e9",
          useCases: ["Sunlight exposure", "Forest bathing", "Fresh air", "Gardening", "Earthing"]
        },
        {
          name: "Body",
          category: "Serotonin Source",
          description: "Physical regulation through movement and touch promotes hormonal balance.",
          color: "#0ea5e9",
          useCases: ["Aerobic exercise", "Massage therapy", "Gut health maintenance", "Yoga", "Deep breathing"]
        },
        {
          name: "Food",
          category: "Serotonin Source",
          description: "Since 95% of serotonin is produced in the gut, diet plays a crucial role.",
          color: "#0ea5e9",
          useCases: ["Tryptophan-rich foods (Eggs, Cheese)", "Complex carbohydrates", "Probiotics", "Hydration", "Pineapple"]
        },
        {
          name: "Social",
          category: "Serotonin Source",
          description: "Feeling respected, significant, and experiencing gratitude boosts serotonin.",
          color: "#0ea5e9",
          useCases: ["Expressing gratitude", "Being helpful to others", "Community participation", "Reflecting on past achievements"]
        },
        {
          name: "Sleep",
          category: "Serotonin Source",
          description: "Serotonin is a precursor to melatonin, directly impacting sleep quality.",
          color: "#0ea5e9",
          useCases: ["Consistent sleep schedule", "Reducing blue light at night", "Morning light exposure", "Relaxing bedtime routine"]
        }
      ],
      useCases: ["Mood regulation", "Sleep cycle", "Appetite control", "Emotional balance"]
    },
    {
      name: "Endorphins",
      category: "Neurotransmitter",
      description: "The 'Pain' reliever. Produced by the central nervous system to help deal with physical pain or stress.",
      color: "#a855f7", // Purple-500
      children: [
        {
          name: "Intense Sport",
          category: "Endorphin Source",
          description: "High-intensity physical exertion triggers the release of endorphins (Runner's High).",
          color: "#a855f7",
          useCases: ["HIIT training", "Long-distance running", "Weightlifting", "Sprinting"]
        },
        {
          name: "Laugh",
          category: "Endorphin Source",
          description: "Laughter increases oxygen intake and triggers endorphin release to relieve stress.",
          color: "#a855f7",
          useCases: ["Watching comedy", "Joking with friends", "Laughter yoga"]
        },
        {
          name: "Foods",
          category: "Endorphin Source",
          description: "Certain foods trigger mild pain responses or sensory pleasure that releases endorphins.",
          color: "#a855f7",
          useCases: ["Spicy food (Capsaicin)", "Dark chocolate", "Vanilla scent"]
        },
        {
          name: "Relaxation",
          category: "Endorphin Source",
          description: "Calming the nervous system can facilitate natural pain relief and euphoria.",
          color: "#a855f7",
          useCases: ["Meditation", "Aromatherapy", "Hot bath", "Sauna"]
        },
        {
          name: "Art",
          category: "Endorphin Source",
          description: "Creating or consuming art can lead to emotional release and endorphin production.",
          color: "#a855f7",
          useCases: ["Playing music", "Singing", "Dance", "Drama"]
        },
        {
          name: "Kindness",
          category: "Endorphin Source",
          description: "Acts of altruism can produce the 'Helper's High'.",
          color: "#a855f7",
          useCases: ["Volunteering", "Donating", "Random acts of kindness", "Helping a neighbor"]
        }
      ],
      useCases: ["Pain relief", "Stress reduction", "Runner's high", "Euphoria"]
    },
    {
      name: "Oxytocin",
      category: "Hormone",
      description: "The 'Love' hormone. Vital for social bonding, trust, and empathy.",
      color: "#ec4899", // Pink-500
      children: [
        {
          name: "Touch",
          category: "Oxytocin Source",
          description: "Physical contact is the most direct way to stimulate oxytocin production.",
          color: "#ec4899",
          useCases: ["Hugging", "Holding hands", "Cuddling", "Massage"]
        },
        {
          name: "Pet",
          category: "Oxytocin Source",
          description: "Interacting with animals boosts oxytocin for both the human and the animal.",
          color: "#ec4899",
          useCases: ["Petting a dog/cat", "Playing with pets", "Animal therapy"]
        },
        {
          name: "Connect",
          category: "Oxytocin Source",
          description: "Emotional connection and active listening strengthen bonds.",
          color: "#ec4899",
          useCases: ["Deep conversation", "Active listening", "Eye contact", "Support groups"]
        },
        {
          name: "Love",
          category: "Oxytocin Source",
          description: "Romantic intimacy and expressing affection.",
          color: "#ec4899",
          useCases: ["Intimacy", "Dates", "Expressing affection", "Kissing"]
        },
        {
          name: "Give",
          category: "Oxytocin Source",
          description: "Giving gifts or compliments fosters a sense of generosity and connection.",
          color: "#ec4899",
          useCases: ["Giving gifts", "Complimenting others", "Cooking for someone"]
        },
        {
          name: "Share",
          category: "Oxytocin Source",
          description: "Shared experiences amplify the feeling of belonging.",
          color: "#ec4899",
          useCases: ["Shared meals", "Team activities", "Co-op games", "Group singing"]
        }
      ],
      useCases: ["Social bonding", "Trust building", "Empathy", "Relationships"]
    }
  ]
};