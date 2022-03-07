/**
 * @generated SignedSource<<0f1824c27064784f94bc13514ae3aba5>>
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
export type ChangeRuleInfractionFragment = ChangeRuleInfractionFragment$data;
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
