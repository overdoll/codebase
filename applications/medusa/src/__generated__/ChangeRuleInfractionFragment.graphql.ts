/**
 * @generated SignedSource<<2b6b96cf9f447c5eb5dce70954e2216e>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleInfractionFragment$data = {
  readonly infraction: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleInfractionFormFragment">;
  readonly " $fragmentType": "ChangeRuleInfractionFragment";
};
export type ChangeRuleInfractionFragment$key = {
  readonly " $data"?: ChangeRuleInfractionFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleInfractionFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleInfractionFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "infraction",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeRuleInfractionFormFragment"
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "5e65466eb17dccaa231019730e118c54";

export default node;
