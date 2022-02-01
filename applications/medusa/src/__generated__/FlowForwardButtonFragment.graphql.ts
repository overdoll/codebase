/**
 * @generated SignedSource<<7ecc03f551a7ebbaf8394748c2ee4e17>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlowForwardButtonFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"SubmitPostButtonFragment" | "UpdateAudienceButton" | "UpdateCategoryButtonFragment" | "UpdateCharacterButtonFragment" | "UpdateContentButtonFragment">;
  readonly " $fragmentType": "FlowForwardButtonFragment";
};
export type FlowForwardButtonFragment = FlowForwardButtonFragment$data;
export type FlowForwardButtonFragment$key = {
  readonly " $data"?: FlowForwardButtonFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowForwardButtonFragment">;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "570586559fa6fc58fa445093415a1033";

export default node;
