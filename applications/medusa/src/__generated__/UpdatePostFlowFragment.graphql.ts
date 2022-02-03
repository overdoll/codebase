/**
 * @generated SignedSource<<d6f62b690350ec4a275eb6c30c2440ce>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type UpdatePostFlowFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"FlowStepsFragment" | "FlowFooterFragment" | "FlowHeaderFragment">;
  readonly " $fragmentType": "UpdatePostFlowFragment";
};
export type UpdatePostFlowFragment = UpdatePostFlowFragment$data;
export type UpdatePostFlowFragment$key = {
  readonly " $data"?: UpdatePostFlowFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"UpdatePostFlowFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "UpdatePostFlowFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowStepsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowFooterFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "FlowHeaderFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "9a9942426050ce53867f5f2b7013ea2b";

export default node;
