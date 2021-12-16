/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowStepsFragment = {
    readonly " $fragmentRefs": FragmentRefs<"ArrangeFragment" | "AudienceFragment" | "BrandFragment" | "CategoryFragment" | "CharacterFragment" | "ReviewFragment">;
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
      "name": "BrandFragment"
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
    }
  ],
  "type": "Query",
  "abstractKey": null
};
(node as any).hash = 'a8ce0916045c594584851dc923b59245';
export default node;
