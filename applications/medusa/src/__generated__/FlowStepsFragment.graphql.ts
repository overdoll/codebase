/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowStepsFragment = {
    readonly " $fragmentRefs": FragmentRefs<"ArrangeFragment" | "AudienceFragment" | "CategoryFragment" | "CharacterFragment" | "ReviewFragment" | "ProcessFragment">;
    readonly " $refType": "FlowStepsFragment";
};
export type FlowStepsFragment$data = FlowStepsFragment;
export type FlowStepsFragment$key = {
    readonly " $data"?: FlowStepsFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowStepsFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowStepsFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ArrangeFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "AudienceFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CategoryFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CharacterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ReviewFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = 'a1cd1523518a54cce1a97c814d043987';
export default node;
