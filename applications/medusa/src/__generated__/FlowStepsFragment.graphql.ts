/**
 * @generated SignedSource<<4d6fc40412fc937e2dc4c4419e4f11be>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type FlowStepsFragment$data = {
  readonly " $fragmentSpreads": FragmentRefs<"ArrangeFragment" | "AudienceFragment" | "CategoryFragment" | "CharacterFragment" | "ReviewFragment">;
  readonly " $fragmentType": "FlowStepsFragment";
};
export type FlowStepsFragment = FlowStepsFragment$data;
export type FlowStepsFragment$key = {
  readonly " $data"?: FlowStepsFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"FlowStepsFragment">;
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
    }
  ],
  "type": "Post",
  "abstractKey": null
};

(node as any).hash = "57b2dd0f76e14a775ca9b625e04f38c9";

export default node;
