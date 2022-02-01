/**
 * @generated SignedSource<<8f7a8cc44376501d01abebab92428e84>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlowHeaderFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"checkPostRequirementsFragment" | "ProcessContentFragment">;
  readonly " $fragmentType": "FlowHeaderFragment";
};
export type FlowHeaderFragment = FlowHeaderFragment$data;
export type FlowHeaderFragment$key = {
  readonly " $data"?: FlowHeaderFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowHeaderFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FlowHeaderFragment",
  "selections": [
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "checkPostRequirementsFragment"
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ProcessContentFragment"
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "c3b56f8d9f198223a1e6495fbf9fb1a7";

export default node;
