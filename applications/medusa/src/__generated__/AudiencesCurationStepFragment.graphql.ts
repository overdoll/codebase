/**
 * @generated SignedSource<<c9ec9420743805012361be40ab78242d>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { Fragment, ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type AudiencesCurationStepFragment$data = {
  readonly audience: {
    readonly audiences: ReadonlyArray<{
      readonly id: string;
      readonly title: string;
    }>;
  };
  readonly " $fragmentType": "AudiencesCurationStepFragment";
};
export type AudiencesCurationStepFragment = AudiencesCurationStepFragment$data;
export type AudiencesCurationStepFragment$key = {
  readonly " $data"?: AudiencesCurationStepFragment$data;
  readonly " $fragmentSpreads": FragmentRefs<"AudiencesCurationStepFragment">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AudiencesCurationStepFragment",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "AudienceCurationProfile",
      "kind": "LinkedField",
      "name": "audience",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "concreteType": "Audience",
          "kind": "LinkedField",
          "name": "audiences",
          "plural": true,
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
              "name": "title",
              "storageKey": null
            }
          ],
          "storageKey": null
        }
      ],
      "storageKey": null
    }
  ],
  "type": "CurationProfile",
  "abstractKey": null
};

(node as any).hash = "84261a46a3756d00db27fc0661a1ef9f";

export default node;
