/**
 * @generated SignedSource<<362c2228009bfecad4516d7be1b3bfdd>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeRuleDeprecatedFormFragment$data = {
  readonly id: string;
  readonly deprecated: boolean;
  readonly " $fragmentType": "ChangeRuleDeprecatedFormFragment";
};
export type ChangeRuleDeprecatedFormFragment = ChangeRuleDeprecatedFormFragment$data;
export type ChangeRuleDeprecatedFormFragment$key = {
  readonly " $data"?: ChangeRuleDeprecatedFormFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeRuleDeprecatedFormFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeRuleDeprecatedFormFragment",
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
      "name": "deprecated",
      "storageKey": null
    }
  ],
  "type": "Rule",
  "abstractKey": null
};

(node as any).hash = "20901b03af0f3a10069f6547b5039a68";

export default node;
