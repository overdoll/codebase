/**
 * @generated SignedSource<<2a40b9de745aaf4277befd7ba45d3522>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleDeprecatedFragment$data = {
  readonly deprecated: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDeprecatedFormFragment">;
  readonly " $fragmentType": "ChangeRuleDeprecatedFragment";
};
export type ChangeRuleDeprecatedFragment$key = {
  readonly " $data"?: ChangeRuleDeprecatedFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDeprecatedFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleDeprecatedFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "deprecated",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeRuleDeprecatedFormFragment"
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "09ee89b598f14360a3191bb27411920b";

export default node;
