/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowForwardButtonFragment = {
    readonly " $fragmentRefs": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButton" | "UpdateBrandButtonFragment" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "UpdateContentButtonFragment">;
    readonly " $refType": "FlowForwardButtonFragment";
};
export type FlowForwardButtonFragment$data = FlowForwardButtonFragment;
export type FlowForwardButtonFragment$key = {
    readonly " $data"?: FlowForwardButtonFragment$data | undefined;
    readonly " $fragmentRefs": FragmentRefs<"FlowForwardButtonFragment">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowForwardButtonFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "SubmitPostButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateAudienceButton"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateBrandButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCategoryButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateCharacterButtonFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "UpdateContentButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '6fe4a9ab10d22a0c992f9824c4a8302f';
export default node;
