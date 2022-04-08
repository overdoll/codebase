Object.defineProperty(exports, "__esModule", { value: true });
var PlannerEventKind;
(function (PlannerEventKind) {
    PlannerEventKind["UpdateSchema"] = "UpdateSchema";
    PlannerEventKind["Plan"] = "Plan";
    PlannerEventKind["Exit"] = "Exit";
})(PlannerEventKind || (PlannerEventKind = {}));
const send = async (payload) => await Deno.core.opAsync("send", payload);
const receive = async () => await Deno.core.opAsync("receive");
let planner;
const updateQueryPlanner = (schema) => {
    try {
        planner = new bridge.BridgeQueryPlanner(schema);
        return { data: { kind: "QueryPlan", node: null } };
    }
    catch (e) {
        const errors = Array.isArray(e) ? e : [e];
        return { errors };
    }
};
async function run() {
    while (true) {
        try {
            const event = await receive();
            switch (event === null || event === void 0 ? void 0 : event.kind) {
                case PlannerEventKind.UpdateSchema:
                    const updateResult = updateQueryPlanner(event.schema);
                    await send(updateResult);
                    break;
                case PlannerEventKind.Plan:
                    const result = planner.plan(event.query, event.operationName);
                    await send(result);
                    break;
                case PlannerEventKind.Exit:
                    return;
                default:
                    print(`unknown message received: ${JSON.stringify(event)}\n`);
                    break;
            }
        }
        catch (e) {
            print(`received error ${e}\n`);
            await send({ errors: [e] });
        }
    }
}
run();
//# sourceMappingURL=plan_worker.js.map