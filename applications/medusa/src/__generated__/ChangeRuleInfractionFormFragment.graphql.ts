/**
 * @generated SignedSource<<1e9b673b2d53d7ef02d21a0fcb788f92>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleInfractionFormFragment$data = {
  readonly id: string;
  readonly infraction: boolean;
  readonly " $fragmentType": "ChangeRuleInfractionFormFragment";
};
export type ChangeRuleInfractionFormFragment$key = {
  readonly " $data"?: ChangeRuleInfractionFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleInfractionFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleInfractionFormFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "infraction",
      "storageKey": null
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "0865580f297fd3ce8ffa6669a42be368";

export default node;
