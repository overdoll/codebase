/**
 * @generated SignedSource<<56d648be49b4188885c7594339d22e6d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type ChangeAudienceStandardFragment$data = {
  readonly standard: boolean;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceStandardFormFragment">;
  readonly " $fragmentType": "ChangeAudienceStandardFragment";
};
export type ChangeAudienceStandardFragment$key = {
  readonly " $data"?: ChangeAudienceStandardFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"ChangeAudienceStandardFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "ChangeAudienceStandardFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "standard",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "ChangeAudienceStandardFormFragment"
    }
  ],
  "type": "Audience",
  "abstractKey": null
};

(node as any).hash = "3a6c5cfd428579b9259b5361d2fcc444";

export default node;
