/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FlowForwardButtonFragment = {
    readonly " $fragmentRefs": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "UpdateContentButtonFragment" | "ProcessButtonFragment">;
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
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessButtonFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};
(node as any).hash = '51d4dc73b4b3aad0af2a5d866ebbc9db';
export default node;
