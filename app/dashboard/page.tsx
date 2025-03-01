const Dashboard: React.FC = () => {
  const opportunities = [
    {
      id: 1,
    },
    {
      id: 2,
    },
  ];

  return (
    <div>
      <div className="container title">
        <h1>Dashboard</h1>
        <p>Check out the opportunities below and apply anytime!</p>
      </div>

      <div className="container">
        {opportunities.map((opportunity) => (
          <OpportunityCard key={opportunity.id} />
        ))}
      </div>
    </div>
  );
};

const OpportunityCard: React.FC = () => {
  return (
    <div>
      <h1>Opportunity Card</h1>
    </div>
  );
};

export default Dashboard;
